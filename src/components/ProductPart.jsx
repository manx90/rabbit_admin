import { InfoProduct } from "./InfoProduct";
import { ColorWithSizes } from "./ColorWithSizes";
import { UploadImageColors } from "./UploadImageColor";
import { useProduct } from "../Contexts/Product.Context";
import { useCategory } from "../Contexts/Category.Context";
export function Products() {
	const {
		styleProduct,
		productInfo,
		dispatchProductInfo,
		updateId,
		isUpdate,
	} = useProduct();
	const { mainCategoryProduct } = useCategory();
	return (
		<div>
			<div className={styleProduct.level1}>
				<InfoProduct
					styleProduct={styleProduct}
					MainCategoryProduct={
						mainCategoryProduct
					}
					ProductInfo={productInfo}
					dispatchProductInfo={
						dispatchProductInfo
					}
					updateId={updateId}
				/>
				<UploadImageColors
					styleProduct={styleProduct}
					ProductInfo={productInfo}
					dispatchProductInfo={
						dispatchProductInfo
					}
					isUpdate={isUpdate}
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
