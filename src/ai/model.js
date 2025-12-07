// src/ai/model.js
import * as tf from "@tensorflow/tfjs";

export function createModel() {
  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 8, activation: "relu", inputShape: [4] }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 })); // 예측값: 추천 시간 1개 출력

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: "meanSquaredError",
  });

  return model;
}
