import AllProjects from "@/components/all-projects-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Dashboard = () => {
  return (

    <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs
          orientation='vertical'
          defaultValue='allProjects'
          className=''
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='allProjects'>All Projects</TabsTrigger>
              <TabsTrigger value='project1'>Project 1</TabsTrigger>
              <TabsTrigger value='project2'>Project 2</TabsTrigger>
              <TabsTrigger value='project3'>Project 3</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='allProjects' className='space-y-4'>
            <AllProjects />
          </TabsContent>
        </Tabs>
    </div>


    // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      
    //   <div className="grid auto-rows-min gap-4 md:grid-cols-4">
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //   </div>
      
    //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //   </div>
      
    //   <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />

    // </div>
  )
}

export default Dashboard
