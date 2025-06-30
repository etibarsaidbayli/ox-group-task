import React, {useEffect, useState} from 'react';

import {Checkbox, Table} from 'antd';
import type { TableProps } from 'antd';

import {productAPI} from "../../api/product.api";

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
		render: (category: string | null) => category || '—'
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
		render: (value: boolean) => (<Checkbox checked={value}/>)
	},
	{ title: 'Unit', dataIndex: 'unit', key: 'unit' },
];


const Product: React.FC = () => {


	const [data, setData] = useState<DataType[]>([]) ;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [totalCount, setTotalCount] = useState<number>(0);

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);

			try {
				const { items, total_count } = await productAPI.getVariations(currentPage, pageSize);
				setData(items);
				setTotalCount(total_count);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		getProducts();
	}, [currentPage, pageSize]);


	return (
	 <Table<DataType>
	  rowKey="id"
	  columns={columns}
	  dataSource={data}
	  loading={loading}
	  pagination={{
		  pageSize,
		  current:currentPage,
		  total: totalCount,
		  onChange: (page, pageSize) => {
			  setCurrentPage(page);
			  setPageSize(pageSize);
		  }

	  }}
	 />
	)
};

export default Product;