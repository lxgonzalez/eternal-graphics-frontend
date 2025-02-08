import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import { ProductProvider } from "../service/ProductContext";

export default function Home() {
    return (
        <>
            <Navbar />
            <ProductProvider> 
                <ProductGrid /> 
            </ProductProvider>
        </>
    )
}