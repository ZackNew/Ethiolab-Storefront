import axios from 'axios';

export const state = () => ({
  companyInformation: 2,
});

export const getters = {};

export const mutations = {
  SET_COMPANY_INFORMATION(state, payload) {
    state.companyInformation = payload.company;
  },
};

export const actions = {
  setInfo: async ({ commit }) => {
    const baseUrl = process.env.GRAPHQL_API;
    const body = {
      query: `query{
        getCompanyInfos{
          id
          company_name
          email
          phone_number
          commercial_bank
          icon{
            preview
          }
          facebook_address
          instagram_address
          twitter_address 
          linkdin_address
          telegram_address
          youtube_address
          longtude
          latitude
          location_text  
        }
      }`,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const compy = await axios.post(baseUrl, body, options);
    const infos = compy?.data?.data?.getCompanyInfos;
    commit('SET_COMPANY_INFORMATION', { company: infos });
  },
};
