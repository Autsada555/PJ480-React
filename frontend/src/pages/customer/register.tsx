import DSLOGO from '@/assets/DS-Logo.png';
import { CustomerCreate } from '@/components/ui/CustomerCreate';


export function Register() {
  function fetchCustomer(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div className="bg-[#01BD63] h-14"></div>
      <div className=" flex flex-wrap justify-center mt-8">
        <div className='w-64'>
          <img src={DSLOGO} alt="dslogo" className="" />
        </div>
        <div className='absolute mt-[100px]'>
          <CustomerCreate  />
        </div>
      </div>
    </div >
  );
}
