import { 
  ArrowDRSVG,
  ArrowULSVG,
  DownloadSVG,
  MaximizeSVG,
  MinimizeSVG,
  MusicSVG,
  PlaySVG,
  PlayRndSVG,
  PauseSVG,
  PauseRndSVG,
  SettingsSVG,
  SkipFwSVG,
  SkipBwSVG,
  VideoOnSVG,
  VideoOffSVG,
  VolumeMuteSVG,
  VolumeMinSVG,
  VolumeMidSVG,
  VolumeMaxSVG,
  WifiOffSVG,
  WifiOnSVG
} from './_icons/.export';
import React, { useState } from 'react';

const ListIcons = () => {
  const [size] = useState('56');
  return (
    <div style={{
      height: '100vh',
      width: '60%',
      /* */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      /* */
      gap: '1rem'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'center',
        /* */
        gap: '1rem'
      }}>
        <ArrowDRSVG size={size} />
        <ArrowULSVG size={size} />
        <DownloadSVG size={size} />
        <MaximizeSVG size={size} />
        <MinimizeSVG size={size} />
        <MusicSVG size={size} />
        <PlaySVG size={size} />
        <PlayRndSVG size={size} />
        <PauseSVG size={size} />
        <PauseRndSVG size={size} />
        <SettingsSVG size={size} />
        <SkipFwSVG size={size} />
        <SkipBwSVG size={size} />
        <VideoOnSVG size={size} />
        <VideoOffSVG size={size} />
        <VolumeMuteSVG size={size} />
        <VolumeMinSVG size={size} />
        <VolumeMidSVG size={size} />
        <VolumeMaxSVG size={size} />
        <WifiOffSVG size={size} />
        <WifiOnSVG size={size} />
      </div>
    </div>
  )
}

export default ListIcons;