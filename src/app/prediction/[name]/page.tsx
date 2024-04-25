const getPredictedGender = async(name:string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`)
  return res.json()
}

const getPredictedCountry = async(name:string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`)
  return res.json()
}
 
interface Params {
  params : {name: string};
}

export default async function Page({params}:Params) {
  const genderData = getPredictedGender(params.name)
  const countryData = getPredictedCountry(params.name)

  const [gender, country] = await Promise.all([genderData, countryData])
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 text-black text-2xl fonts-semibold">
      <div>
        <div className="text-5xl font-extrabold pb-4">Personal Info</div>
        <div>Gender: {gender?.gender}</div>
        <div>Country: {country?.country[0]?.country_id}</div>
      </div>
    </div>
  );
}
