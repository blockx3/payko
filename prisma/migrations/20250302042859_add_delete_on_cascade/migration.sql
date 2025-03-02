-- DropForeignKey
ALTER TABLE "UserWallet" DROP CONSTRAINT "UserWallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "payment_category" DROP CONSTRAINT "payment_category_userId_fkey";

-- DropForeignKey
ALTER TABLE "payment_details" DROP CONSTRAINT "payment_details_userId_fkey";

-- DropForeignKey
ALTER TABLE "received_payments" DROP CONSTRAINT "received_payments_payment_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_category" ADD CONSTRAINT "payment_category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "received_payments" ADD CONSTRAINT "received_payments_payment_detail_id_fkey" FOREIGN KEY ("payment_detail_id") REFERENCES "payment_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;
