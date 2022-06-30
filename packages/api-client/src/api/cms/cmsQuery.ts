import gql from 'graphql-tag';
export default gql`
    query getCms($type:[Type!]!) {
        getCms(type:$type) {
            id
            content
            cmsType
            featuredAsset{
                preview
            }
        }
    }
`;
