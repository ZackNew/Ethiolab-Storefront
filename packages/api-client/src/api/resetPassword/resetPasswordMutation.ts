import gql from 'graphql-tag';

export default gql`
  mutation resetPasswordMutation($tokenValue: String!, $newPassword: String!) {
    resetPassword(token: $tokenValue, newPassword: $newPassword) {
      ... on CurrentUser {
        id
        identifier
        channels {
          id
          token
          code
          permissions
        }
      }
      ... on PasswordResetTokenInvalidError {
        errorCode
        message
      }
      ... on PasswordResetTokenExpiredError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`;
