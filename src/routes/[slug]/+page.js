export const load = ({ fetch, params }) => { 
    const fetchCar = async () => {
      const res = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json')
      const data = await res.json()
      let data_for_slug = data.filter((d) => { return d.car_id == params.slug})
      return data_for_slug
    }

    const fetchStops = async () => {
      const res = await fetch('https://vda-lab.github.io/assets/vast2021_carstops.json')
      const data = await res.json()
      let data_for_slug = data.filter((d) => { return d.car == params.slug})
      return data_for_slug
    }
    
  
    return {
      car: fetchCar(),
      stops: fetchStops(),
      carId: params.slug
    }
  }