import Table from "../components/Table";
import { HeaderProduct } from "../components/HeaderProduct";
import { SubCategory } from "../components/SubCategory";
import { MainCategory } from "../components/MainCategory";
import { Products } from "../components/ProductPart";
import Message from "../components/Message";
import SaveCancel from "../components/SaveCancel";
import UpdateCancel from "../components/UpdateCancel";
import { useProduct } from "../Contexts/Product.Context";
import UploadImages from "../components/ui/uplaodImage";
import { TableProvider } from "../Contexts/TableProduct.context";

export default function Product() {
	const { productInfo, isUpdate } = useProduct();
	return (
		<div className="ContentPage">
			{/* Main Content */}
			<Message />
			<div className="flex-1 overflow-auto">
				<div className="relative md:p-6 p-2 space-y-6 overflow-x-hidden">
					<div className="animate-fadeIn">
						<HeaderProduct
							title={"Categories"}
							AddNew={false}
						/>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-slideUp">
						<MainCategory />
						<SubCategory />
					</div>
					<div className="animate-fadeIn">
						<HeaderProduct title={"Products"} />
					</div>
					<div className="animate-slideUp">
						<Products />
					</div>
					<div className="animate-fadeIn flex flex-wrap flex-col md:flex-row gap-6">
						<UploadImages
							name="imgCover"
							multiple={false}
							borderColor="border-red-500"
							type="SET_IMG_COVER"
							productInfo={productInfo}
						/>
						<UploadImages
							name="imgs"
							multiple={true}
							borderColor="border-blue-500"
							type="SET_IMGS"
							productInfo={productInfo}
						/>
						<UploadImages
							name="imgMeasurement"
							multiple={false}
							borderColor="border-green-500"
							type="SET_IMG_MEASUREMENT"
							productInfo={productInfo}
						/>
						<UploadImages
							name="imgSize"
							multiple={false}
							borderColor="border-yellow-500"
							type="SET_IMG_CHART"
							productInfo={productInfo}
						/>
					</div>
					<div className="animate-slideUp">
						{isUpdate === true ? (
							<UpdateCancel />
						) : (
							<SaveCancel />
						)}
					</div>
					<div className="animate-fadeIn">
						<HeaderProduct
							title={"Products List"}
						/>
					</div>
					<div className="animate-slideUp">
						<TableProvider>
							<Table />
						</TableProvider>
					</div>
				</div>
			</div>
		</div>
	);
}
