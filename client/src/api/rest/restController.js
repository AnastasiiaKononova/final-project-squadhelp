import http from '../interceptor';
import queryString from 'query-string';

const authBase = '/auth'; //+

export const registerRequest = (data) => http.post(`${authBase}/registration`, data);
export const loginRequest = (data) => http.post(`${authBase}/login`, data);
export const getUser = () => http.get(`${authBase}/me`);

const offerBase = '/offers';

export const setNewOffer = (formData) => http.post(offerBase, formData); //+
export const setOfferStatus = ({ id, ...data }) => http.put(`${offerBase}/${id}/status`, data);//for moderator

const contestBase = '/contests';

export const updateContest = (id, formData) => http.put(`${contestBase}/${id}`, formData); //+
export const downloadContestFile = (fileName) => http.get(`${contestBase}/file/${fileName}`);//-
export const getActiveContests = (filters) => http.get(`${contestBase}`, { params: filters }); //+
export const getContestById = (id) => http.get(`${contestBase}/${id}`); //+
export const getCustomersContests = (data) => http.get(`${contestBase}/customer?${queryString.stringify(data)}`); //+

const userBase = '/users';

export const changeMark = ({ id, ...data }) => http.patch(`${userBase}/${id}/mark`, data);//-

export const updateUser = ( formData ) => http.put(`${userBase}`, formData);//+

const conversationBase = '/conversations';//+

export const newMessage = (data) => http.post(`${conversationBase}/messages`, data); 
export const getDialog = (interlocutorId) => http.get(`${conversationBase}/${interlocutorId}`); 
export const getPreviewChat = () => http.get(`${conversationBase}/preview`);
export const changeChatFavorite = (data) => http.patch(`${conversationBase}/favorite`, data); 
export const changeChatBlock = (data) => http.patch(`${conversationBase}/blacklist`, data); 

const catalogBase = '/catalogs'; //+

export const getCatalogList = () => http.get(catalogBase);
export const addChatToCatalog = ({catalogId, conversationId}) => http.post(`${catalogBase}/${catalogId}/conversations/${conversationId}`);
export const createCatalog = (data) => http.post(`${catalogBase}`, data);
export const deleteCatalog = (catalogId) => http.delete(`${catalogBase}/${catalogId}`);
export const changeCatalogName = ({ catalogId, catalogName }) => http.put(`${catalogBase}/${catalogId}`, { catalogName }); 
export const removeChatFromCatalog = ({ catalogId, conversationId }) => http.delete(`${catalogBase}/${catalogId}/conversations/${conversationId}`);

const bankingBase = '/bankings';//+

export const payMent = (formData) => http.post(`${bankingBase}/pay`, formData); 
export const cashOut = (data) => http.post(`${bankingBase}/withdraw`, data);

const contestPropertiesBase = 'contests-properties';//+

export const dataForContest = (params) => http.get(`${contestPropertiesBase}/characteristic`, { params }); 
