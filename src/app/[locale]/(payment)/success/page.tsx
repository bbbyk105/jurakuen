// src/app/[locale]/success/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Check, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_details: {
    email: string | null;
    name: string | null;
  };
  metadata: Record<string, string>;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingReceipt, setSendingReceipt] = useState(false);
  const [receiptSent, setReceiptSent] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(
    null
  );

  // isJapaneseを安全に計算（sessionがnullの場合も考慮）
  const isJapanese = session?.metadata?.locale === "ja";

  // fetchSessionDataをuseCallbackでメモ化
  const fetchSessionData = useCallback(async () => {
    if (!sessionId) {
      setError("セッションIDが見つかりません");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/checkout?session_id=${sessionId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "セッション情報の取得に失敗しました"
        );
      }

      const data = await response.json();
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  // Webhook が領収書を送ったかどうかを確認する。ここでは送信しない。
  useEffect(() => {
    if (!sessionId || session?.payment_status !== "paid") return;

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      if (cancelled || attempts >= 6) return;
      attempts += 1;
      try {
        const response = await fetch(
          `/api/send-receipt?session_id=${encodeURIComponent(sessionId)}`,
        );
        if (response.ok) {
          const data = (await response.json()) as {
            customerReceipt?: string;
          };
          if (!cancelled && data.customerReceipt === "sent") {
            setReceiptSent(true);
            return;
          }
        }
      } catch {
        // 状態確認に失敗しても、ボタンからの送信は残す
      }
      if (!cancelled && attempts < 6) {
        timer = setTimeout(tick, 2000);
      }
    };

    void tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [sessionId, session]);

  // リダイレクトのカウントダウンと実行
  useEffect(() => {
    if (redirectCountdown === null || redirectCountdown <= 0) return;

    const timer = setTimeout(() => {
      if (redirectCountdown === 1) {
        // ホームページにリダイレクト
        router.push("/");
      } else {
        setRedirectCountdown(redirectCountdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown, router]);

  const sendReceiptEmail = async () => {
    if (!sessionId) return;

    try {
      setSendingReceipt(true);
      const response = await fetch("/api/send-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "領収書の送信に失敗しました");
      }

      const data = (await response.json()) as { alreadySent?: boolean };
      setReceiptSent(true);

      // 自動送信済みの確認ではページを閉じない。この操作で初めて送ったときだけ戻す。
      if (!data.alreadySent) {
        setRedirectCountdown(3);
      }
    } catch (err) {
      console.error("領収書送信エラー:", err);
      alert(
        err instanceof Error
          ? err.message
          : isJapanese
          ? "領収書の送信に失敗しました"
          : "Failed to send receipt"
      );
    } finally {
      setSendingReceipt(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    const cur = currency.toUpperCase();
    const isJPY = cur === "JPY";
    return new Intl.NumberFormat(isJPY ? "ja-JP" : "en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: isJPY ? 0 : 2,
    }).format(isJPY ? amount : amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{isJapanese ? "読み込み中..." : "Loading..."}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p>
                {isJapanese
                  ? "セッション情報が見つかりません"
                  : "Session not found"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center bg-green-50 border-b">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            {isJapanese
              ? "ご購入ありがとうございます！"
              : "Thank you for your purchase!"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isJapanese
              ? "決済が正常に完了しました"
              : "Your payment was successful"}
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* 注文詳細 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {isJapanese ? "注文詳細" : "Order Details"}
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>{isJapanese ? "注文番号" : "Order ID"}:</span>
                <span className="font-mono text-sm">{session.id}</span>
              </div>

              <div className="flex justify-between">
                <span>{isJapanese ? "お客様名" : "Customer"}:</span>
                <span>
                  {session.customer_details.name ||
                    (isJapanese ? "お客様" : "Customer")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{isJapanese ? "メールアドレス" : "Email"}:</span>
                <span>{session.customer_details.email}</span>
              </div>

              <div className="flex justify-between">
                <span>{isJapanese ? "決済ステータス" : "Payment Status"}:</span>
                <span className="text-green-600 font-semibold">
                  {session.payment_status === "paid"
                    ? isJapanese
                      ? "支払い完了"
                      : "Paid"
                    : session.payment_status}
                </span>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>{isJapanese ? "合計金額" : "Total Amount"}:</span>
                <span>
                  {formatAmount(session.amount_total, session.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* 領収書送信セクション */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {isJapanese ? "領収書" : "Receipt"}
            </h3>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                {receiptSent
                  ? isJapanese
                    ? "領収書をご入力のメールアドレスへ送信しました。届かない場合は迷惑メールフォルダもご確認ください。"
                    : "Your receipt has been sent to the email address you entered. Please also check your spam folder."
                  : isJapanese
                    ? "領収書はお支払い完了時に自動で送信されます。しばらく待っても届かないときだけ、下のボタンを押してください。同じ領収書が二重に送られることはありません。"
                    : "Your receipt is sent automatically when payment completes. Use the button below only if it does not arrive. The same receipt will not be sent twice."}
              </p>

              <Button
                onClick={sendReceiptEmail}
                disabled={sendingReceipt || receiptSent}
                className="w-full"
                variant={receiptSent ? "secondary" : "default"}
              >
                {sendingReceipt ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isJapanese ? "送信中..." : "Sending..."}
                  </>
                ) : receiptSent ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {redirectCountdown !== null
                      ? isJapanese
                        ? `送信完了！ ${redirectCountdown}秒後にホームへ移動...`
                        : `Sent! Redirecting to home in ${redirectCountdown}s...`
                      : isJapanese
                      ? "送信済み"
                      : "Already sent"}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    {isJapanese
                      ? "領収書をメールで送信"
                      : "Send Receipt via Email"}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 次のステップ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {isJapanese ? "次のステップ" : "What's Next"}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                {isJapanese
                  ? "• 商品の発送準備を開始いたします"
                  : "• We will begin preparing your order for shipment"}
              </p>
              <p>
                {isJapanese
                  ? "• 発送完了時に追跡番号をメールでお送りします"
                  : "• You will receive tracking information via email when shipped"}
              </p>
              <p>
                {isJapanese
                  ? "• ご不明な点がございましたら、当メールまでお問い合わせください"
                  : "• Contact our support team if you have any questions"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
