import React from 'react'
import ToolBar from '../../../components/common/toolBar/ToolBar'
import Content from '../../../components/manager/appointment/content/Content'

const Appointment = () => {
  return (
    <div className="mt-10">
    <ToolBar isShowElevatedButton={false} isShowOulineButton={false} />
    <div>
      <Content />
    </div>
  </div>
  )
}

export default Appointment