import path from 'path';
import fs from 'fs-extra';
import { ConfigType } from '../types/ConfigType';

export const bootstrapStartBat = async (
  clients: ConfigType['clients'],
  startTimeout: number,
  windowedMode: boolean,
  lowGraphics: boolean,
  highPriority: boolean,
): Promise<void> => {
  const startBatPath = path.join(__dirname, '../../start.bat');
  const clientPath = path.join(__dirname, '../../clients/CS_%%i');
  const timeout = startTimeout ? `\n  timeout ${startTimeout}` : '';
  const priority = highPriority ? ' /high' : '';
  const windowed = windowedMode ? ' -window' : '';
  const graphics = lowGraphics ? ' -16bpp' : '';

  await fs.writeFile(startBatPath, `@echo off

for /l %%i in (1, 1, ${clients.length}) do (
  start${priority} /d "${clientPath}" hl.exe -game cstrike -steam${windowed}${graphics}${timeout}
)

exit
`);
};
