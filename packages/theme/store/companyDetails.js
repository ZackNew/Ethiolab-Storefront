import axios from 'axios';
export const state = () => ({
  companyInformation: null,
});

export const getters = {};

export const mutations = {
  SET_COMPANY_INFORMATION(state, payload) {
    state.companyInformation = payload.company;
    console.log('i commited', state.companyInformation);
  },
};

export const actions = {
  async getCompanyInfo({ commit }) {
    const baseUrl = process.env.GRAPHQL_API;
    const body = {
      query: `query{
        getCompanyInfos{
          id
          company_name
          email
          phone_number
          icon{
            preview
          }
          facebook_address
          instagram_address
          twitter_address 
          linkdin_address
          telegram_address
          youtube_address
          longitude
          latitude  
        }
      }`,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const companyInfo = await axios.post(baseUrl, body, options);
    commit('SET_COMPANY_INFORMATION', {
      company: companyInfo?.data?.data?.getCompanyInfos,
    });
  },
};
