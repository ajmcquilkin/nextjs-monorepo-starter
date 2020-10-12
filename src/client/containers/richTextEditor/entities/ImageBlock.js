import React from 'react';

function ImageBlock(props) {
  const { blockProps } = props;
  const { entity } = blockProps;
  const { src, alt } = entity.getData();

  return <img className="ImageBlock" src={src} alt={alt} width="256" />;
}

export default ImageBlock;
