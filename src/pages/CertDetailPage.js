import React from "react";
import { useParams, Link } from "react-router-dom";

const CERT_DATA = {
  TOEIC: {
    name: "TOEIC",
    level: "중급 ~ 고급",
    description:
      "국제 공인 영어 능력 시험으로, 주로 취업 및 승진, 어학 능력 평가에 많이 사용됩니다.",
    tips: [
      "매일 꾸준히 리스닝과 리딩을 병행하세요.",
      "파트별 시간 배분 연습이 매우 중요합니다.",
      "실제 시험과 유사한 모의고사를 자주 풀어보세요.",
    ],
  },
  정보처리기사: {
    name: "정보처리기사",
    level: "고급",
    description:
      "소프트웨어 개발, 시스템 구축, 데이터베이스, 운영체제 등 전반적인 IT 지식을 평가하는 국가기술자격증입니다.",
    tips: [
      "과목별(소프트웨어공학, 데이터베이스, 운영체제 등)로 요약 노트를 정리하세요.",
      "기출 문제를 여러 번 반복해서 풀어보는 것이 핵심입니다.",
      "실기 대비를 위해 구현 경험(코딩)을 병행하면 좋습니다.",
    ],
  },
  컴활1급: {
    name: "컴퓨터활용능력 1급",
    level: "중급 ~ 고급",
    description:
      "엑셀, 액세스 활용 능력을 평가하는 자격증으로, 사무직 및 공공기관에서 많이 요구됩니다.",
    tips: [
      "엑셀 함수와 피벗테이블에 익숙해지는 것이 중요합니다.",
      "액세스는 테이블/쿼리/폼/리포트 흐름을 이해하세요.",
      "실제 실기 유형을 시간 재고 풀어보는 연습이 필요합니다.",
    ],
  },
  한국사: {
    name: "한국사능력검정시험",
    level: "초급 ~ 중급",
    description:
      "한국사의 전반적인 흐름과 사건, 인물에 대한 이해를 평가하는 시험입니다.",
    tips: [
      "시대별 큰 흐름을 먼저 잡은 후, 세부 사건을 외우세요.",
      "연표를 활용해 시대 순서를 정리하면 기억에 도움이 됩니다.",
      "자주 나오는 인물과 사건은 따로 정리해 두세요.",
    ],
  },
};

export default function CertDetailPage() {
  const params = useParams();
  const decodedId = decodeURIComponent(params.certId || "");
  const certInfo = CERT_DATA[decodedId];

  return (
    <div className="page">
      {!certInfo ? (
        <>
          <h1>자격증 정보를 찾을 수 없습니다.</h1>
          <p>URL이 잘못되었거나 지원하지 않는 자격증입니다.</p>
        </>
      ) : (
        <>
          <h1>{certInfo.name} 상세 정보</h1>
          <p className="sub-text">
            난이도: <strong>{certInfo.level}</strong>
          </p>

          <div className="card">
            <p>{certInfo.description}</p>
          </div>

          <h3>공부 팁</h3>
          <ul className="tip-list">
            {certInfo.tips.map((tip, index) => (
              <li key={index} className="tip-item">
                {tip}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="link-row">
        <Link to="/select" className="link">
          ← 자격증 다시 선택하기
        </Link>
        <span style={{ margin: "0 8px" }}>|</span>
        <Link to="/" className="link">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
