// src/ai/train.js
import * as tf from "@tensorflow/tfjs";
import { createModel } from "./model";

export async function trainAndSaveModel() {
  const model = createModel();

  // 예시 훈련 데이터 (가상의 샘플)
  const xs = tf.tensor2d(
    [
      [1, 3, 30, 1],
      [2, 4, 60, 2],
      [3, 5, 90, 3],
      [1, 2, 15, 1],
    ], 
    [4, 4]
  );

  const ys = tf.tensor2d(
    [
      [2], 
      [3], 
      [4],
      [1.5]
    ],
    [4, 1]
  );

  await model.fit(xs, ys, { epochs: 50 });

  // public/models 폴더에 저장됨
  await model.save("localstorage://recommendation-model");

  console.log("모델 학습 완료 & 저장됨");
}
