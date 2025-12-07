// src/ai/loadModel.js
import * as tf from "@tensorflow/tfjs";

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel(
      "localstorage://recommendation-model"
    );
    return model;
  } catch (err) {
    console.error("모델 로드 실패:", err);
    return null;
  }
}

export async function predictStudyTime(input) {
  const model = await loadModel();
  if (!model) return null;

  const { current, target, days, daily } = input;

  const tensorInput = tf.tensor2d(
    [[Number(current), Number(target), Number(days), Number(daily)]],
    [1, 4]
  );

  const output = model.predict(tensorInput);
  const result = output.dataSync()[0];

  return Math.max(1, Math.min(result, 6)); // 1~6 사이로 제한
}
