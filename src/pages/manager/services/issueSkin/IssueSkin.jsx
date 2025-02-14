import React from 'react'
import ToolBar from '../../../../components/common/toolBar/ToolBar'
import Content from '../../../../components/manager/services/issueSkin/content/Content'

export const IssueSkin = () => {
  return (
    <div className='mt-12'>
      <ToolBar />
      <div>
        <Content />
      </div>
    </div>
  )
}
