/* eslint-disable */

import { http } from './HttpService_assessment'


export default {
	load(params = '') {
		return http.get('surveys/' + params)
	},
	answers(params = '') {
		return http.get('/collectors/420393192/responses/' + params)
	}
}