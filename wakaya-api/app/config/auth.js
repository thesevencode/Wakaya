let auth = {}

const SEED = 'algo-muy-dificl-de-adivinar-wakaya'

const GoogleAuth = {
    service: 'gmail',
    auth: {
        type: 'oauth2',
        user: 'manumayo8@gmail.com',
        clientId: '803339639394-h57q8ar2261deaajlfqd9h1vcrnqacqb.apps.googleusercontent.com',
        clientSecret: 'pz-a1I2T2qWz4uy3nquYbujv',
        accessToken: 'ya29.Gls5B3EcHgwm2N01IK4IWJLhMEBB5V-44FXfttImwQwbPajhC_Y90XOxlEn29R1v5TpZ730z7SuaC1C2Ck_UGwEsuRLpDkdafAKJExYWSWQoO9kh3MFWYsb9Rtz3',
        refreshToken: '1/pkY2nCS_ohjc8Rp2EKmbW0Vu_R4_StqhNmyoUjEXSDo'
    }
}

auth.SEED = SEED
auth.GoogleAuth = GoogleAuth

module.exports = auth