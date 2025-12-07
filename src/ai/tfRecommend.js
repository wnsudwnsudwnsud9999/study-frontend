// src/ai/tfRecommend.js
import * as tf from "@tensorflow/tfjs";

// 브라우저에서 간단한 선형 모델로 권장 학습 시간 예측
export async function predictStudyTime({ current, target, days, daily }) {
  const cur = Number(current) || 1;
  const tgt = Number(target) || Math.max(cur + 1, 2);
  const d = Number(days) || 30;
  const h = Number(daily) || 1;

  // 0~1 범위로 간단 스케일링
  const input = tf.tensor2d(
    [[cur / 10, tgt / 10, Math.min(d / 120, 1), Math.min(h / 8, 1)]],
    [1, 4]
  );

  // 수동으로 지정한 가중치 (tf.js 연산 보여주기용)
  const W = tf.tensor2d([[0.3], [0.7], [0.2], [1.0]], [4, 1]);
  const b = tf.scalar(1.0);

  // y = xW + b
  const y = input.matMul(W).add(b);
  const value = y.dataSync()[0];

  // 메모리 정리
  input.dispose();
  W.dispose();
  b.dispose();
  y.dispose();

  // 1~6 시간 범위로 제한 + 소수 1자리
  const clipped = Math.max(1, Math.min(value, 6));
  return Number(clipped.toFixed(1));
}
