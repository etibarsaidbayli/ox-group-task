import api from './axios';

export const authAPI = {
	async login(username: string, password: string) {
		try {
			const response = await api.post(
			 '/security/auth_check',
			 new URLSearchParams({
				 _username: username,
				 _password: password,
				 _subdomain: 'toko',
			 }),
			 {
				 headers: {
					 'Content-Type': 'application/x-www-form-urlencoded',
				 },
			 }
			);

			return response.data;
		} catch (error: any) {
			throw new Error(
			 error.response?.data?.message || 'Invalid username or password'
			);
		}
	},
};
