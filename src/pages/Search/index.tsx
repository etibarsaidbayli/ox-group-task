import {Table, TableProps, Input} from "antd";
import React, {useEffect, useState} from "react";
import {productAPI} from "../../api/product.api" ;

interface DataType {
	id: number;
	sku: string;
	productName: string;
	supplier: string;
	category: number;
	barcode: string;
	lastUpdateTime: string;
	showMarket: boolean;
	unit: string;
}

const columns: TableProps<DataType>['columns'] = [

	{
		title: 'Product Name',
		dataIndex: 'productName',
		key: 'productName',
		render: (text) => <a>{text}</a>,

	},
	{
		title: 'SKU',
		dataIndex: 'sku',
		key: 'sku',
	},
	{
		title: 'Supplier',
		dataIndex: 'supplier',
		key: 'supplier',
	},

	{
		title: 'Category ID',
		dataIndex: 'category',
		key: 'category',
		render: (category: string | number | null) => category || '—'
	},
	{
		title: 'Barcode',
		dataIndex: 'barcode',
		key: 'barcode',
	},
	{
		title: 'Last Update Time',
		dataIndex: 'lastUpdateTime',
		key: 'lastUpdateTime',
	},
	{
		title: 'Show Market',
		dataIndex: 'showMarket',
		key: 'showMarket',
		render: (value: boolean) => (value ? 'Yes' : 'No')
	},
	{ title: 'Unit', dataIndex: 'unit', key: 'unit' },
];


const Search:React.FC = () => {

	const [data, setData] = useState<DataType[]>([]) ;
	const [loading, setLoading] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {

		const fetchProducts = async (size = 300) => {
			setLoading(true);

			try {
				const res = await productAPI.getAllVariations(size);
				setData(res.items);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();

	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filteredData = data
	.filter((item) =>
	 item.productName?.toLowerCase().includes(searchTerm)
	)
	.sort((a, b) => {
		const aIndex = a.productName.toLowerCase().indexOf(searchTerm);
		const bIndex = b.productName.toLowerCase().indexOf(searchTerm);
		return aIndex - bIndex;
	});


	return (
	 <>
		 <div
		 style={{margin:"20px 10px",width:"500px"}}
		 >
			 <Input
			  placeholder="Search"
			  value={searchTerm}
			  onChange={handleSearch}
			 />
		 </div>
		 <Table<DataType>
		  rowKey="id"
		  columns={columns}
		  dataSource={filteredData}
		  loading={loading}
		  pagination={false}
		 />
	 </>

	)
}

export default Search ;