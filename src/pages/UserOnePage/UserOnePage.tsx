import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";


import IUserInfo from "../../model/IUserInfo";
import useLoader from "../../hooks/useLoader";
import { notEqual } from "assert";


interface IUserOnePageProps {
  id: string;
}

const fields: TypedField[] = [


  {
    type: FieldType.Div,

    style: {
      display: 'grid',
      gridTemplateColumns: "150px auto",
      gap: "2rem",
    },
    fields: [
      {
        type: FieldType.Group,
        style: {
          display: "grid",
        },
        fields: [
          {
            type: FieldType.Box,
            style: {
              width: '90%',
              height: '70%',
              maxWidth: '200px',
              background: 'rgba(73, 73, 73, 0.824)',
              backgroundImage: 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFhUYGBgYHBgYGhoYGBgYGRgYGBgZGhoYGBgcIS4lHB4rHxwYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABAEAABAwEFBAcHAgUDBAMAAAABAAIRAwQSITFBBVFhcSKBkaGxwfAGEzJCUtHhYnIUkqKy8RUjgjODwtIHJHP/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMEAAX/xAAkEQACAgICAQQDAQAAAAAAAAAAAQIRAyESMUETIlFhMkJxBP/aAAwDAQACEQMRAD8A8vAXQC3dXQC0UQNBq20LsBdBqJxyGLdxdtapGNRFs6s1nLnADVH7at4pM/h6fxHB7hn+wefZpjtlYUGF8dM4M/cderPnCrzXEkuOMeJTN8VXlipcnb6Rpwu8Sc/W5Q4ldPdOPrkuDioyZeKJ6MTv71PWJwC1ZqSkrMSN6GSF9c4qMSFM6mumU0UczdIB2Gvf1b1MygQY6/yF2yzT6xH49cEfRoEiHYHf4OHdPMFOlYnRLZqxyeL7dCT0xyccep0jkjxZhF5pkHCY/peND6xQlJhBhw4HgUax904DPAtOTh99x9Fo/Yr10TWO0wbjzH0k6HQE6jinNmdjGRySSpQDmyDO4nT9LkZs+uXC6742jX5m8eW/kVqgiE/ovGwbSWu56IT212E1wFZgwdJMaH8qHZVQ3gDnod4HmPWaudkYKlN7HYgjx/Pgp5fa+QYbVHg9poQShHMVq29s4se5pGLSR1aFV2oxI0FMCLFyWohzVyWoDEBauCFOWrktQOIYWKW6trqDZCAthq6DV0AgE0GrYC7DV0GogNNajbFQkqCmyU4ay5Te/Ro7ToO1NFWxJOkV/blol93RmHXr3pe8QA3XM8ysqGX95WPOZ6h65JJO22UiqSRG7cETZbKXaLLNTlPLPThQkzRGJzZ7IQFI/Z8o6ixG0qam5F1FUIn7JnELn/SyMYkd4VrpUQjKFjByRUhJQRUKNgIxAlo7QjGWLTQ/CeP0nn58otg2SHdJnRd3HgRuQFossXmlsHVunNvrzVoysjKNCV1nwkjEYHe5uh5j7KOpRwA7D4dSY1jr8zYvcQcA7yKFcc27pI4t1Hn1qsSbBbO8tMHPP9w1HOMepMGtDoc2MDAJ0/Q/eCJx49qt0tPJG0XlpD2iWuwcNCNx9blqg9EZosNgJMAGCMWz3Se49uivGwa0wRhIy3cOo3h1KiWKCLzTIGI3jeHb4w6lctgv6TSMnEnrIxHbePWlzK4iY3UhV7ebOktqAYOEO5j8LzS00oJXt+26AqWc+o0ntheQ7UoQ9w4nxUIO4lZKmInMXBainsUbmIgBi1aLVOWLgtXUcRXVikhYuo4GDV2GrsNXQCUY01q2GrprVK0IgJ7BSlw4Yplt9tygGjU+vPtXOy6GXHwmPXNS+1TIpM433dyrFUiTdsorMyd5jsWqmg34qQNiBwJUbx0gs8lo0x7DrIIj11p1ZkioPxTmyvWeRqgNaIRdJBUijKZSFUG0SmdmKU0imdmKFnNWOKQ1Q+0rLfbhg4YtPH7Lqg9FgXhGunHgmTJtFLrsJ6QHSZIc3eNQeH43oS0UMGvbzH58CrBtizljhVblk8bxvQzLOCCNDiOE5+t4WmMrj9kZRqX0IajLwDgOBG5E2ChmAYDsOTjke2MNURToBri05H0CjLLZAHQR60PgtWN2rMuRVo72Wx7DJDcM8WtnQgtvHyVq2A4NcRo3pjg2CCOrLqCpm1rA5tTIlrgHAzvzkaY9SebIvmmQ34wLh4tJE9eEdqfIuSJR0y7UBeoQd3fH3XmPtNZbtQ8YPbmvUNmDoXSqR7W2bI6i8Ow/dyyw/JovLpMoNSmoXMR9ZiFe1PRMFcFG4IhzVGWrhiGFilurSBxDdXQapIWw1KE5DVIxi21ilYxMgMebEZ0hxBH9P3hSe2dmIpsP6Xd5A81PsKjJZxH4Rnt6B7po4Ef1s8gVVfBNnlbxE8gFA/4uoI2szA8/D/KEqjEcvMqE1ovB7JrOE5sgSuztTWyuCzSRrixpSajKYQlF4RLHqbKoNoplZ0obWAzUdXbrGcTuCFWG0W2gjGtXmtf2uqZMaBxOJW7NtW1VD8TgOd0J1Fk27PSLTQDmnjgef5Vds1ItLmasy4jTu8FvZVGvmXmDgQXE4bxxC2++yoHPgjKRqOIVIrixXtUdWmzyA8KexskgHXLgdW8kZSpibujsR9lKyx6bj6K1QlRlyKyDa1EtpseDix13Hc7ET1h38yJ2Nb6Ui+wB28McJ6hgjnUg5hY+Yc2TGfRMiMNwKFsdkY1wDDMHATrpMAJ3JU0ySi+Wiy2W0te57W/IA084k+I7FX/aWzy1x4z2gz3ph7P7PqUnOvkOvibzSSCcJmdV1tmjfY6B0gB1x6KzqlLXRWSfHZ5RaW4oR7U52hQgyMj6hLHsVWRA3NXDmIotUZauGILixTQsXHAwathqka1dBqQ45a1TU2LTWomz05ICZAZZ/ZyniD9I8SoPb5w6DeZPIBM9jtDLvKTyjDy7Uj9sGl9RgOoceQwhVitk29FBtPmT3oC0sJiN3mU3tNGDG77pY+pEjn4qc0WgwVtB+h71I2o9up7VGKjp38lNTtAJAczPCb5GsTJwWfZo0H2PaTxmrDYrReVMc4A4Exxz/KfbAqy4NSSiVjLwP7TRLm4JRabJHxK92bZ8sBhJ9sbKeQS1s6Kafgo0in+9a04AT61Rdm2m2QDUYzji6OxBMsV95DjA8Vy3ZBa5pBxByu3geI0PWrRjZKU3HwWtm0i0C5Wp1BwJaex33TKxbQLxcdnmOe5Vpns4HMZAh8y4tOUnKBuV62V7NMY0EFxdvcZ/CGkxk21sN2d02De30PXBPrNSvCdRgfXrNKqdO67ngeadbPd9iqp6IyR0yniMMkL7lrHBwAxyHkm4ZCqu0dsvpVy11MOpwOBBEyR1yOpJKVobDFuWg7ZVoey1Opue5zXgubeORGIjcITG2g9IDAxgeIyQFMtq1KFZnwtvB05jAwP6kztrYceU+aGLtlP9daa7rf8ASl7UsoqNLmiHDFzf/IeYVWrMhW22vLKhI0J6xP2hJtr0BevtGDtNx1HLULVR5wicxQliNcxROYgcD3VimurFxxDcWBinDF2ynPNCg2QsYm2zLKSRx7gMyuLPs92buiOOZ5NzTukA1t1oz7eZ9YJ4xFbGNgZJ4eMJRtWnftLdzWk9V4eaeWJsBL6tK9WqnRjGDtkpk9ivooG0qQvv5wOUlV21UtOaue0qOJP1EnscR65qtW+n0jzK6a0PjexTRF10hMaTGuOA45AwTuW7NZQTimzKAAwCxym1pG2ME9sSW+ytEOEiBGMfZFezjP8AcCzaJ0RPsyyaiRv2jRS5JHq9ixptC3aKMsc3KV3ZHC40bgi4CinstJHntu2CZOJCgs+wnA4uHYrvbGAoAshNyOSs62TYmtjUq32CgIkqs2LNWFtrDWwFyOcWxZtIw89nXoUysD8Y3pBbK15/M+ac2F0OB6u0K8H7SOWNMeOOA4GCq9t5jC8yMD47wnlerdY524T16JdYWNLWu+IiRJ7R49yDOxunYu2HTLKeOAc9sTuBme5WS14tB3tVer2oe9FIGS3Fx/UcmjkPFWI40+QKZRcUrEzS5SbKftmn0p5eCSW4wAOXcFZ9qNAxO4evW9VO1uLnElXsyNAL2KFzEWonsXAB7qxTXVpcdZgtJ0a3+UKRlqfkDH7QG+EKJlIoqz0icAFys50E2SkTichiSj6RjErlzQwBg0xcd5UL6klPYo2stW9hyQ1pqXX2g8GdzSpdmM74HaUPtKnNoez6jTB5QjHsD6Flqsf+2x0awTzGXcD1qnbSoxJ3HyXq21rPLGtEQMeAj/Kpw2a2o99M4F7XXTucAbs9aP5IMXxZT6D4cmF/BLrRTLXEEQQYI3KVlXBYckaZ6UJJxBtpPgjirB7J0Pm1lVS0V5eHHIFM9l7XLHECQOPkUrVxo6MkpWev0GENBOowWq1QtEqn09r1y0OpNa8xMF0Hlkm9h2g+szpsLDkd07gdVnaL0FvryuJQzmEFSMcihkkG0XQu6lfBDArtrdU62G0kbs1MudOjcevQJxZjJHBLWaDu8ym1gZjK0xVIyTduybbdvZTptD3AX3BokxIAvHy7UNZrQDZ6rqTgS1pcIxiJxHGAexVj/wCQbRetFOlOFNkn9zzJ7gxO/Yg9ANOTmlpHWfIqix1HkRc/1Fth/wCq07w2f5Qr3Y3S1w4KmOs9ytdPy4dhwPZCt2zXY8wU2XcbEj2I9tM6J5eBBVVtDNVdNuU4B6/D8KpVWaJU7QklsWuatXdFO9i4upgEfuStKS6sXAI6TCSndGy+7bJ+M/0j7ruz2RtEXjBfpqG/coK01iSj0KY4kmACVunZnkzEcyG+KhY0n8ouiAP1O7hyCJw42dSLSML0Y4EbjqSl98vthJEG6DEz8ojGOKc2NsMJ1OHbn3eKT0XD+Pfuux2NH2Rj5/gJLoY7QcYMwAIEDjJ8AqtSdFRruPecVYdtWgNZGpl3gFWqT8Q7QFp+/mnh0LLsV+1+zwKrnsGDoJ/dAJ7c1U6pMQvQ/aBkvLdCJ7QI8lR7fQukqOaFrkacOT9RS6iSpbFZC54bvIWPfCiNqLDIMEajNZdmhVZ6L7PWQU6twYggHrVxcyBkvHbL7QPjFxJ3zirBs/2ttXw3Hvb+ppPYVJxZo76LrXAQ4aq6/b1Z7sLO8fVhgOtNLHa7wkiEtBQ0Y3U5Lpzxp2/YIcOldtKpFrwc/sKszZcrDs1mpy8kmsNMnTPAIn2ktvuLLVg9K5dkfU83B1gEnqV4pvRmnI8+tlt/iLRVq6OLi39owZ3AK6+yxuspn9RHaPwvPtkD4+Xmr97PH/ZB+lwPfB8VrkvZRlb9wx29Riu131AHrGBHZCZWB8Fq1tSlfph2rSCORwPl2KKyuyULuFD9MK25Sls+tVS7TTgr0C0svNjeI+x7VTdoWeHFJjeqBNbEr2KEtRr2qFzFUQHurSnurEDiSvXvawhnPH+fsoGvhae71vRsUm94UZYWSZKXsKebKoXnAaYIo4fMbda0cO8/iFVmVItk/rIPUwq01KgBLnfC2SvN9p22ajnN+Z7iOTgAnh5Fn4GW2toB7zB6MgDkMu049aG2ZUDnupnmODsRHZ5Id8NZednh946//JAWCoRL/mmRznDyToQebUcbrCflBYf+By7I7FWK0PEax2hWr2hI9zfbk8scOF5pBHd3qkVXwZGmSEnoMVuxdaaOYKio0WtIMApk8B4/UM+PEIQU8YWSceJuhKxzZrdTDQOiE/2XtdgwaATyVfsWx2Oi8Se5WOwbFY34cFlbRuWRtbG4tV4IYtg4IptlgLT2AJAWcMej7JTLiAP8DelNS0sZmfXBbZtN5EM6I4ZnmVaCXbEm30i2vtjKQgYuyA3cTxVa9s67v4VknF9WTxuMd5vHYtWckmSpPbOj/wDVon6Xyf8AmH/+oWiDTejNKNLZWtjNwPFXb2UeCHMOvn+VS9lYOjl3kKz7FeWOHD191rauJlb2XmzGWw7cWnwQzKd1105g+iiKBkXhk7ucPXcuqzJh2vwnloVkumV8BYxZySTa9mnHfj1+vEJ5QGEIK0skR6nd4jsSRdMZq0U6tSQ5ZondroZ79OI+6WvpKxGgS4sRd1Yus6iuLtgnqWBilpsxwXHHVFhJhWnZVOATuEdZ9FJrNTxw9cE6tFobRo33aC9zOQHreiKJPa7aV1ootPSdi7gN3X91T2Q57ZOF44/8ZkrNo2sucXuMueSfXh/lDNBLTzHeCqrSom97J7far5ut+AYDjxPNTVGXKIeRF4w3iY05DvcFJsexBxLnmGM6TichCW7b2l71/REMaLtNu5u88TmV10FKx06037BnJY8NP8wjucOxVKqU12XWinUpnJ7ZE/U0S3t+yX0KRe6PQ3lB7GWiSx0CYAGJK72lYoeQ3NoBdwMSewJ7YqbKTDUfpg0b93alu1LQ2nRfexrVgRH0McZc48xgOZXSiuOwRk+WgSwW67gcFYbBtZu9efCu4a9uK6FrfoY5Lz5RR6UZ62eoP2swCS4DrSG3+0l43afSO/QfdU73j35uJ5nDsTjZdAJOKRRSvobWKk5xvPJJ4p1Qpwh7K3BHMQ5DUF2ZuKcbUs3vaD6YzDAW/uYA6OuCOtKrOMk6s9Uh5PEq+J0iGVWyg2QQe38Kz2PR2mB7fsfFAbc2f7qreaOg/ps7ek3qPdCO2W4RdOWXUVuTtGFrZbdkVcLhy04JsG7+RVbsTi0xqMuIVks9QOE66rNkVOysSWkIUNoZiRv8USxarNkclFPZStCW20pHHz3JPVpTMZ6jzCsdoZhOh9fZKq1M5jMZ/dViybQpurEff4DsWJ9C0VBrVOwLTWImz0pTCMO2fRxA7fXJVv2w22HvuNxaw5Tm7KTwGXajNv7ebQYabDNRwgn6AdTxO5ViwbJe836jrjMy5xAMdeSeKrYj2C0Kb3vwaXuOgHdwCYvsJZJeRLQ0vjJgLgAOcSYUtp2/QoNLLM0OdkahGHMTi7uCSWCu+pUDXEm+XAz9TwRePWQimrOadE+19rh491SF2mO15+p3DcEDZbMXS92DG5nedGN3k7lA6rTYZfJI+Rpgnm75RykqOttH3kXnBjG4NYwZDcB4k4lI2r2Ok60E/wASS8XcwZ4CNO5WCwWdjGGrUcGMG/M8APJVUbVDBDGDm7Ek7yNfBB2u1veBecSJJ4TyXeol9nenKX0h5tX2hvulggD4ZGXGN6Q1a5cS5xJJxJOJJ4qBbAUZZHLsvHGo9GKenRJUbGJxYKUhRk6LxjYLQpwU8sIhDussFFWdsKcmViqHVndgjaGKU0npxYGzikS2O3oOZmEzYelz80AxiOpjAHcrxZGQW+myow03jDNpGbXbwkrbM+m6DiJgEZFNwUFTeX2h7ZloYJHEEx/crY8lOmQyY01aGllcCBOmu78JrZnlpSqlSI+HsTOzZTHUnk0+ifFx7HNNwIkLZcg6ToyyRQIOSzyjRROzipTBB3JPaWEGRmMOpPGoG10cfWSMWc0K5H0jtKxTfw5WJxKKcxiX7d22KDLjINRw6mA6nyCn2rtBtFhMi8cp8TwXn1or33E4uJMlztTyVW1FWyUYuTpE1O33SX3b9QkmX/C0/VHzOQVrtz3mXvLuGg5DJEMoTmphZRuUZZ/g0R/z12K21Y+Uk8cB913TtL7zTMQ4EAYDAz1oupZIyUFxBZWF4UDWyiPeP/e/+4qK4EztbRffOrnHtJKhNlnIpZS2NGOhe5q7YwlS1bM9uYW7I8B2IJkRhoZzRW+hZaasiNErplnTMUlK2mFNyLKIv/hsEw2IOndK6gKSw0oeHBK3oeK2PbVYYEoL3UK1sph7BySm2WeEowoL4MK1bMpdAKoPM1A3irlZrUwNAByC7o59DBjFMwwgRawuv4tu9MpCOId7xCbEZLn1CfiMdmP2QVS1kva1hMkyYBMNGZgepITfZg6EABpmc4BBw3DcrRTcW0SbSkosNU9Cq4GBjwWqVJnz1Wjg0ElF0rTZ2ZFzjySxtBlT8BdAOIxaQphI0ISurtr6WgDiZQ3+tVJ+LuCeyfBllY+VuowOEa6JKzbEROJ1Rln2ox2GSRrYadEn8Jw71iJ96PqCxHYKPmnae0n16hc7L5RoB91JZaSWWXNPLI1JOTbsrjgoqkEU6CmFnRNnYihTCmWFbqKBtFl1TquAl9copitCq20vhO9o7uj5KCk4gpm8S3kfH/HeoDTTtiJENqqi4ULZ2COoaaYZccd6ntlHolQ2J+A/lPMThhngRgO1UxEc16Gln3HP1v0yx4oltNp0Qjoi8CJPjjjM4nL4Z3yYMk2d84HP1uQywp2hsGVNcWENszdyZ7PsjZyS+mmtiqQs7NSHDBcEJRtS0YFG1bTISq1NvII6hG2b06qx7LpyMUtZZsU72cyITHdDFtmXZs7QJOAGak96AErtNtLzh8AxnDHccQRHPA9gLQg5OkTnPirZ3TxdeiJIGohoMY/TnjJHxcE3sJjDeNerLDjOZz7V1lYSRhi0cRF2TIGcT8zDEMxGKYWYCCQcDl3HMYO0GOOC0y9saMcW5TsKLlw5y4L1y5yzJGxmnvUJqRifXNY9yBqvMqidC1YYLRxXTbaRklRqrbXyg5DKI6/1J29aSy6ViHM7ijyiyuTyyPSGzFN7M5KwRH1nqqd1oSllWFzUtKUYKtFdAvqIapaJXAqI0dYWwzgtgKKk5TyizkcvZISp9G48/S7DgOeOScArmtSDhBXRlxdizipKgahVAgSc50HRPHQRrk3TPCe4MN/AZTn0RkczGgggJfdcw4nk7fjgJ388Nc0bTqHQTiIyJkl1wTIvk4C+MQBhqtkZKSMEouDC7PaiIvDPdG4EjPSfyUzs9UHI+uSS3sM5EZbwMBA0GTQDMSVM1pO+ccZMyYvGQIGfMQN4WeWNWaseZ0P2uWnNlKqFpcPmOJyMZFx3xkB3qala3kCXNHwaA/E0ziNJgzGhUvTZb1kMadNFfxDWDEpO20PIBLuMSRILcQWtGWDs8yRotUQPhxJkDfJyZOnSENMk8oCeOP5JyzfCGL7U5+hDdwzOHrlgcREk2VmPIzIMb5dIxAkRfaboi8Ql9Mj4cScIAgkiInObwMGM3yG6J9Zn3RlJAJJAEAYODhE9AB2NIZamSJ0xjwVmWU+boYe6axl2IPYwnAAw34BkGvbnmoWuAyneZiSdZhDGodSC7EFzcjOd39JGmQiBhnq+s+SfLSNWHHx2wr3i2XIYPXV5Inoq1s6eULXYiJWnLrOE7xC3SfiirRSQbhCAwb75Ygry0gA82sya2dYsTMnHoIUFVYsQHBypGLFiYARSU5z7FixB9HI2F2sWJRkC274CgaHwD9r/AAYsWK+LyZs3Yys3xD99D+xdj/rH/t/2LFiaXYkehrQyb6+QLlvy+vkWLEoyNUPl500U34B/+D/7AsWJ0K/I/wBj5v8A3WT+x66fmzk3++usWKmTojD8kcBYsWLCekjbVK1YsR8HPs2VorFi4BFUyS6strFwUQrFixAJ/9k=)',
              margin: 'auto',
            },
          },
          {
            type: FieldType.Rating,
            name: 'rating',
            defaultValue: 3,
          }
        ]
      },

      {
        type: FieldType.Group,
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Profile",
          },

          {
            type: FieldType.Combo,
            name: 'prefix',
            title: 'Пол',
            async itemList() {
              return [
                'Mr.',
                'Mrs.',
                'Miss',
                'Ms',
              ];
            },
            async tr(current) {
              // await sleep(5e2);
              if (current === 'Mr.') {
                return 'Mr.';
              } else if (current === 'Mrs.') {
                return 'Mrs.';
              } else if (current === 'Miss') {
                return 'Miss';
              } else if (current === 'Ms') {
                return 'Ms';
              } else {
                return "";
              }
            },
            defaultValue: 'their-unique-key',
          },

          {
            type: FieldType.Combo,
            title: 'Списки',
            name: 'suffix',
            async itemList() {
              return ['I', 'II', 'III', 'IV', 'V', 'VI', 'Sr.', 'PhD', 'MD', 'DDS'];
            },
            async tr(current) {
              // await sleep(5e2);
              if (current === 'I') {
                return 'I';
              } else if (current === 'II') {
                return 'II';
              } else if (current === 'III') {
                return 'III';
              } else if (current === 'IV') {
                return 'IV';
              } else if (current === 'V') {
                return 'V';
              } else if (current === 'VI') {
                return 'VI';
              } else if (current === 'Sr.') {
                return 'Sr.';
              } else if (current === 'PhD') {
                return 'PhD';
              } else if (current === 'MD') {
                return 'MD';
              } else if (current === 'DDS') {
                return 'DDS';
              } else {
                return "";
              }
            },
            defaultValue: 'their-unique-key',
          },

          // {
          //   type: FieldType.Items,
          //   title: 'Lists',
          //   name: 'suffix',
          //   itemList: ['I', 'II', 'III', 'IV', 'V', 'VI', 'Sr.', 'PhD', 'MD', 'DDS']
          // },

          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
            },
            fields: [

              {
                type: FieldType.Text,
                // readonly: true,
                name: "keyword",
                title: "User id",
                outlined: false,
                isDisabled: () => true,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "keywordChecked",
                title: "keywords",


              },
            ],
          },
        ]

      },

    ]
  },

  {
    type: FieldType.Line,
    title: "Common info",
  },

  {
    type: FieldType.Text,
    name: "firstName",
    title: "name",
    description: "name",
  },

  {
    type: FieldType.Text,
    name: "lastName",
    title: "surname",
    description: "lastName",
  },

  {
    type: FieldType.Text,
    name: "age",
    title: "age",
    description: "42",
  },

  {
    type: FieldType.Expansion,
    title: 'Подписка',
    description: 'Подписка на уведомление',
    fields: [
      {
        type: FieldType.Switch,
        title: 'Подписка есть',
        name: 'subscribed',
        defaultValue: true,
      },
    ],
  },

  {
    type: FieldType.Group,

    style: {},

    // "email": "Bradford94@gmail.com",



    // "phonenumber": "414.736.3825 x7282",





    fields: [
      {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '0',
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Работа",
          },

          {
            type: FieldType.Text,
            name: "jobTitle",
            title: "Должность",
          },

          {
            type: FieldType.Text,
            name: "jobArea",
            title: "Место работы",
          },
        ]
      },

      {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '0',
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Домашний адрес",
          },

          {
            type: FieldType.Text,
            name: "country",
            title: "Страна",
          },

          {
            type: FieldType.Text,
            name: "city",
            title: "Город",
          },

          {
            type: FieldType.Text,
            name: "state",
            title: "обпасть",
          },

          {
            type: FieldType.Text,
            name: "address",
            title: "Адрес",
          },
        ]
      },

    ]
  }
];

export const UserOnePage = ({ id }: IUserOnePageProps) => {

  // const { setLoader } = useLoader();

  // const fetchState = (
  //   async () => await fetchApi("/users"),
  //   {
  //     onLoadStart: () => setLoader(true),
  //     onLoadEnd: () => setLoader(false),
  //   }
  // );

  const fetchState = () => [
    fetchApi<IUserInfo>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {


    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Список профилей"
          subtitle="Профиль"
          onSave={beginSave}
          onBack={() => history.push("/users_list")}
          saveDisabled={!data}
        />
        <One<IUserInfo>
          handler={() => props.data}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(data) => <Content data={data} />}
    </FetchView>
  );
};

export default UserOnePage;
