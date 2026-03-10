import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { users, referrals } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function ReferralsPage() {
  const session = await auth();
  
  let referralData = {
    code: "NEZ123",
    total: 0
  };

  if (session?.user?.email) {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, session.user.email));
      
      if (user) {
        const [result] = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(referrals)
          .where(eq(referrals.referrerUserId, user.id));

        referralData = {
          code: user.referralCode,
          total: Number(result?.count || 0)
        };
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
    }
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralCard code={referralData.code} total={referralData.total} />
      <p className="text-sm text-slate-400">No self-referrals. Max 5 referrals per IP per day.</p>
    </main>
  );
}
