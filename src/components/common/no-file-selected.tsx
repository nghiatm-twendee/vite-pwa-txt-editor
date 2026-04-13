import { FilePlusIcon, FileTextIcon, FolderOpenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

const NoFileSelected = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>No file selected</EmptyTitle>
        <EmptyDescription>
          Create a new text file or open an existing one to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <FilePlusIcon />
            New File
          </Button>
          <Button variant="outline">
            <FolderOpenIcon />
            Open File
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export default NoFileSelected
