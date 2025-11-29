import ReferenteCard from '../ReferenteCard'
import portrait1 from '@assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png'

export default function ReferenteCardExample() {
  return (
    <div className="max-w-sm">
      <ReferenteCard
        nombre="Sara Huamán"
        foto={portrait1}
        rol="Lideresa Cultural y Educadora"
        biografiaCorta="Lideresa wanka, promotora cultural y defensora de la educación rural para mujeres."
        onClick={() => console.log('Card clicked')}
      />
    </div>
  )
}
