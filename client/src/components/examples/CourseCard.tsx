import CourseCard from '../CourseCard'

export default function CourseCardExample() {
  return (
    <div className="max-w-md">
      <CourseCard
        id="curso-ejemplo-1"
        titulo="Liderazgo Femenino Wanka"
        descripcion="Desarrolla habilidades de liderazgo mientras honras tu identidad cultural wanka. Aprende estrategias para liderar con autenticidad y fortaleza."
        duracion="4 semanas"
        nivel="Intermedio"
        imagen="/assets/curso_liderazgo.jpg"
        onEnroll={() => console.log('Enrolled in course')}
      />
    </div>
  )
}
