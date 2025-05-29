import Picture from "../../components/gallery/Picture";
import { Suspense } from "react";

const Gallery = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Picture/>
        </Suspense>
    );
}
 
export default Gallery;