import AdmissionsTable from "./AdmissionsTable"


const AdmissionsList = () => {
    

    
  return (
    <div>
    <section className="py-6 bg-medBlue">
        <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold leadi text-gray-100">
              Search for Pending Admitions
            </h1>
            <p className="text-lg text-gray-100">
              Search information about Admissions entries still pending.
            </p>
          </div>
          </div>
      </section>
      <AdmissionsTable/>
      </div>
  )
}

export default AdmissionsList