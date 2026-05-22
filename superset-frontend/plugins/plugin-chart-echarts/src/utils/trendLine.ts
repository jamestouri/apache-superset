/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Computes a linear regression (y = slope * x + intercept) using
 * ordinary least squares over numeric data points.
 *
 * Returns an array of [x, y] pairs representing the trend line
 * at the same x-positions as the input data.
 */
export function computeLinearTrendLine(
  data: [number, number | null][],
): [number, number][] {
  const valid = data.filter(
    (d): d is [number, number] => d[1] !== null && d[1] !== undefined,
  );
  if (valid.length < 2) {
    return [];
  }

  const n = valid.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i += 1) {
    const [x, y] = valid[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) {
    return [];
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return valid.map(([x]) => [x, slope * x + intercept]);
}
