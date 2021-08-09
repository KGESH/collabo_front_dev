import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import QRCode from "qrcode";
import "domain/home/style/Home.css";

const GET_USER = gql`
  query {
    authUser {
      id
      name
      email
    }
  }
`;

const Home = () => {
  /*const { loading, data, error } = useQuery(GET_USER);
  /!**
   * 로그인 성공하면 로그인에 대한 상태 설정필요
   *!/

  if (error) {
  }
  console.log(`auth data:`);
  console.log(data);

  if (data?.authUser) {
    console.log(`id: ${data.authUser.id}`);
    console.log(`name: ${data.authUser.name}`);
    console.log(`email: ${data.authUser.email}`);
  }*/

  // 모달창 생성을 위한 hook
  const [handler, sethandler] = useState(false);
  // 선택한 카드(카페이름)를 모달창 및 useQuery 에 전달하기 위한 hook
  const [cafeName, setCafeName] = useState("");
  // DB에서 선택된 데이터를 받기위한 hook { "test"는 dev용 }
  /*const {loading, data} = useQuery(GET_USER, {
      variables: {name: "test"}
  });*/

  // dev용 카드 리스트 - mongoDB연결 후 삭제
  const item = ["빽다방", "원두마크", "Bacs", "StarBucks", "Angel-in-us", "커피에 반하다", "CCCCCC", "DDDDDD", "EEEEEE"]
  // dev용 QRuri, dev용 cafeInfo - DB연결 후 삭제
  var qr_url: string = 'https://www.starbucks.co.kr/index.do';
  var cafeInfo: string = '스타벅스 입니다.';

  var QR_img: any;
  QRCode.toDataURL(qr_url, function (err, url) {
    QR_img = url;
  })

  return (
    <div className="home_special">
      <div className="blank">
        <div className="home__logo">Collabo</div>

        <div className="point_group">
          {/*{!loading && data.getUser && (<div>{data.getUser.name}님</div>)}*/}
          <div className="dev용_db연결후 삭제">유성현님</div>

          <div className="point_group_inner">
            <label className="point__label">통합 포인트</label>
            <em>
              {/*{!loading && data.getUser && (<strong id="point__value">{data.getUser.point}</strong>)}*/}
              <strong>12,500</strong>
              원
            </em>
          </div>
        </div>
      </div>

      <div className="wallet_group">
        <div className='wallet_inner'>
          {/* 카드를 모두 불러와 map으로 생성
                        @@카드 제작 시 주의사항@@
                        각자 카드의 일련번호는 달라야 함, 일련번호가 순서대로 있으면 안됨(보안 취약)
                    */}
          {item.map(card =>
            <div className="wallet__card" onClick={() => {
              sethandler(true);
              setCafeName(card);
            }}>
              <div className="margin_left">{card}</div>
              <div className="cafe_info">{cafeInfo}</div>

            </div>)}
        </div>
      </div>

      {/* 모달창 */}
      {handler ?
        <div onClick={() => sethandler(false)}>
          <div className="modal_group">
            <div className="modal_inner">
              <div className="modal__cafe_name">{cafeName}</div>
              {/* name에 해당하는 카페 정보(Info, QR코드, 디자인을 출력)를 가져와서*/}
              <div className="modal__cafe_info">{cafeInfo}</div>
              <div className="modal__qrcode">
                <img id="qr_image" src={QR_img} alt=""/>
              </div>

            </div>
          </div>
        </div>
        : ""}
    </div>
  );
};
export default Home;



/*const GET_USER = gql`
  query {
    authUser {
      id
      name
      email
    }
  }
`;

const Home = () => {
  const { data } = useQuery(GET_USER);
  /!**
   * 로그인 성공하면 로그인에 대한 상태 설정필요
   *!/

  if (data?.authUser) {
    console.log(`id: ${data.authUser.id}`);
    console.log(`name: ${data.authUser.name}`);
    console.log(`email: ${data.authUser.email}`);
  }

  return (
    <>
      <div className='home'>
        <h1 className='home__title'>This is Home</h1>
      </div>
    </>
  );
};
export default Home;*/
