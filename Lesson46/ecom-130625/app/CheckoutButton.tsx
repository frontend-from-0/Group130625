import { Button } from '@/components/ui/button';

export default async function CheckoutButton({priceId}: {priceId: string}) {
  return (
    <form action='/api/checkout/' method='POST'>
      <input type='hidden' value={priceId} name='price_id'/>
      <Button size='sm' className='flex-1' type='submit' role='link'>
        Buy now
      </Button>
    </form>
  );
}
