import api from './axios';

export const productAPI = {
	async getVariations(page: number = 1, size: number = 10) {
		const res = await api.get('/variations', {
			params: { page, size },
		});
		return res.data;
	},

	async getAllVariations(maxSize: number = 300) {
		const res = await api.get('/variations', {
			params: { page: 1, size: maxSize },
		});
		return res.data;
	}
};
