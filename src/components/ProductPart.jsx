import { InfoProduct } from "./InfoProduct";
import { ColorWithSizes } from "./ColorWithSizes";
import { UploadImageColors } from "./UploadImageColor";
import { useProduct } from "../Contexts/Product.Context";
export function Products() {
	const {
		styleProduct,
		productInfo,
		dispatchProductInfo,
		// setProductInfo,
		// colorInputs,
		// variants,
		// setVariants,
		// handleInfoChange,
		mainCategoryProduct,
		// handleImgWithColorChange,
		// handleImgWithColorAdd,
		// ProductInfo,
		// handleImgWithColorRemoveImg,
		// handleImgWithColorRemove,
	} = useProduct();
	return (
		<div>
			<div className={styleProduct.level1}>
				<InfoProduct
					styleProduct={styleProduct}
					// setProductInfo={setProductInfo}
					// handleInfoChange={handleInfoChange}
					MainCategoryProduct={
						mainCategoryProduct
					}
					ProductInfo={productInfo}
					dispatchProductInfo={
						dispatchProductInfo
					}
				/>
				<UploadImageColors
					styleProduct={styleProduct}
					ProductInfo={productInfo}
					dispatchProductInfo={
						dispatchProductInfo
					}
				/>
				<ColorWithSizes
					
					styleProduct={styleProduct}
					dispatchProductInfo={
						dispatchProductInfo
					}
					productInfo={productInfo}
				
				/>
			</div>
		</div>
	);
}
