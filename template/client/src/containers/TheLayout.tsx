import {
  TheContent,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheHeader/>
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
