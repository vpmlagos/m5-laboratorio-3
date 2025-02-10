import React, { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`[${id}] - Fase: ${phase}, Duración: ${actualDuration.toFixed(2)}ms`);
};

export default onRenderCallback;