
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props

  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        title here
      </DialogTitle>

      <DialogContent>
        {props.children}
      </DialogContent>

    </Dialog>
  )
}

export default Popup