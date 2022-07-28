export default {
  mongo: {
    connectDB:
      "mongodb+srv://root:root1234@coderhouse.vi3s2vw.mongodb.net/ecommerce?retryWrites=true&w=majority",
  },
  firebase: {
    type: "service_account",
    project_id: "coderhouse-b10ff",
    private_key_id: "c03f971e96c35a069e30a12a5a9f6cb8beb3751a",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVD8rLA44j3QkP\neQY/Nw9yuFwkl8ltjQN9yfuzwQNu452L0hVRfjHp4t7aFC2YlX0FBwIlagX/k+y0\nk5z7uMW0YuFDdMUJ8WkYJ3dJTHSBj0V/GHb6r8ggrDOr79PoCaczoWeJZki0flsi\nelWZs/lCFcGFrvl3aKA1m3ZJSyFacHp4kJL6AtOx5Yr2lQ3ulQPHBsYkOf0gG944\nugQTmsh+vO57f28O1zcDTl2R//IFdqqfCyWW/qkfCw/mVNHR039H3BfVwLmBZijA\n/2wOoWy50MrdWeseqO+kBxHf5WNyUlVtHEFIQHtulscYA3zOd0H4PjTqzjU08wNC\ny3/Ukj7lAgMBAAECggEAAvIG8auI6YICwA4CQhl2wzU9QNxAUp1icPi73A5NB9lp\nsicjWE8QTZVvU0B4KOXYJpukMfQ3RQM8gHqR7wDs6sN7Lb2Ng8eslkLlaUP/UFM0\nuL8T1f9cGueGh1f3a/vGLfaLQeECHEyq4d0jFc7hIUK/vCNhG398x4Dwr660NVXW\nQ6apZu9P1qzRYTMz216iFKw6blhWedZa4c5qeISLBHeg12juybAY2hVx1V2qrAk0\nPygWnWdCwIKm8Ggn3Wj1FL0TBq6v6lOPJu0pfa3HNKKpBZ+dKvv0Aaj1PS2V9n2r\n6nAaTvYq6iyHsUr5rbQAiRApu9vdU/k7noUIKfYSeQKBgQD3u/C8PyxHU6ABb9ne\nSBQkwg6zVYlPlPoHap/voZIfRhZ3rcbhgI2xe7Wi1eFt7kUWr9OLjkXnw+NukDa4\n0Q+2jv4acRQwH2qpe0E7WR5m4cSwbtgpjefTzpvFZczenVsW96fscVjN5FEo8LLL\nhP1irHbX0cMsjLOtmERQayO2CwKBgQDcK7EPWyF9rcSsjwsifa0bHk/rpuoWm0kx\nvnoSfHwTvmbM+UyPE2fiuT5VWV071s4JYLZA43V2QnU1GVcZIC3jXmdhfQ4iPoc6\nwWpvMyzf3SvYzCMoP6ANP/RehbrzkvMsWBAYEhu0OZ3Qf9m+F9XrbX0biZ2hSSYE\n7HaagRmkzwKBgHDBbPfxdPDeAhTFWQ+QFQMKBHDhfMbpEsgvYq5KBt0PJIjCYqQe\nw99FZE3CNYG4kl+aFZoOXoj3otue7hk+pn08JjHYyAyDMCQFwpIFpQ3EsqZvPRnk\nyeCgyEuXYyDr1BrnC9pVWMsVoU8WBvsVA9NWlhzzD3eGbv2TMXy81xszAoGBAI//\nZ3Nip/nZ38r4V1D8n24gGidG6M1WTL3jFVXn4wLKwdOHrYHaMFTB0TnjE65iZCkP\n/sNbwORSvPO4mhWNzVVq1fSV5NuSx8Eu5RzLfKsBrX7CrK/TRSvFS19S2Z4a2z6C\nbixAE6yBDm1iYRgJ4Nh0qKGNFPJ6tAn+WefdTddTAoGACR+WKCzNOgMl6gfoRJf+\nfeyvVQQOiWZuUelebbwk+AqzG3/2+9ueYd8o1S7sASajkbg1UYtUPOfktJ74qipG\n38yro4jnnMnRpNxtsctMI7Y5RN7F6hzbEPicXrl633Dgm9CCuCEminNH3ipaEnMX\n9qvF86GFnY9O/at2zcEYc2o=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-jd5uy@coderhouse-b10ff.iam.gserviceaccount.com",
    client_id: "103131823761166167234",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jd5uy%40coderhouse-b10ff.iam.gserviceaccount.com",
  },
  sql: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ecommerce",
    },
    pool: { min: 0, max: 7 },
  },
};
