import { useState } from 'react'
import ProfileModal from '../ProfileModal'
import { Button } from '@/components/ui/button'
import portrait1 from '@assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png'

export default function ProfileModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Profile Modal</Button>
      <ProfileModal
        open={open}
        onClose={() => setOpen(false)}
        nombre="Sara Huamán"
        foto={portrait1}
        rol="Lideresa Cultural y Educadora"
        biografia="Sara Huamán es una destacada lideresa wanka, promotora cultural y defensora de la educación rural para mujeres. Con más de 15 años de experiencia en la región de Huancayo, ha trabajado incansablemente para preservar las tradiciones culturales mientras impulsa la educación y el empoderamiento femenino en comunidades rurales."
        logros={[
          "Fundadora del programa 'Mujeres Wanka Líderes' que ha beneficiado a más de 500 mujeres",
          "Reconocida por el Ministerio de Cultura por su labor en preservación cultural",
          "Coordinadora de talleres de liderazgo en 20 comunidades rurales"
        ]}
      />
    </div>
  )
}
