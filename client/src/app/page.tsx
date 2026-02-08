import Image from "next/image"
import ProductList from "@/components/ProductList";

const Homepage = async ({searchParams}:{searchParams: Promise<{category:string}>}) => { //since its a server component, the params can be fetched without using useSearchParams hook

  const category = (await searchParams).category;
  return (
    <div className=''>
      <div className="relative aspect-[3/1] mb-12"> {/*height will be three times smaller than width */}
        <Image
        src="/featured.png"
        alt="Banner"
        fill
        />
      </div>
      <ProductList category={category} params='homepage'/>
    </div>
  )
}

export default Homepage