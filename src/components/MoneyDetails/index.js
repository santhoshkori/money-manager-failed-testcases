import './index.css'

const MyMoneyDetails = props => {
  const {details} = props
  const {Money, imgurl, styling, alternate, name, testid} = details
  console.log(Money)
  return (
    <div className={styling}>
      <img src={imgurl} alt={alternate} className="listimagestyling" />
      <div>
        <p>{name}</p>
        <p className="amoutparasty" data-testid={testid}>
          Rs {Money}
        </p>
      </div>
    </div>
  )
}
export default MyMoneyDetails
