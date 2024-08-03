import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Cut Down Version that would only show parent comments and "Show x replies" directing to full post view

const mockComment1: string =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor, consectetur pariatur veritatis vel nobis minus inventore? Nesciunt at ipsam beatae aliquam quod, earum officia, incidunt magni, repellat in corrupti unde sit.";
const mockComment2: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat atque omnis exercitationem repellat officiis voluptates quis qui quam praesentium, aut voluptatem illo nihil eligendi! Facere iusto cupiditate odio debitis? Neque ratione sed voluptatum dolore, exercitationem veniam sunt id fuga similique, sit aut consectetur earum porro ducimus cum excepturi repellendus, recusandae ut natus!";
const mockComment3: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const ModalComments = () => {
  return (
    <section className="relative w-full h-full p-4">
      <div className="pb-8 flex flex-col divide-y-2">
        <Comment user={"User1"} comment={mockComment1} />
        <Comment user={"User2"} comment={mockComment2} />
        <Comment user={"User3"} comment={mockComment3} />
      </div>
    </section>
  );
};

interface CommentProps {
  comment: String;
  user: String;
  isChild?: true | undefined;
}

const Comment = (props: CommentProps) => {
  //todo: Incorporate Actual Comment Objects
  //todo: Add Functionality
  //todo: Add an Expand Option to Lengthy Comments

  return (
    <div className="flex my-2">
      {props.isChild && <div></div>}
      <div>
        <div className="flex space-x-2 my-2">
          <Avatar className="w-7 h-7">
            <AvatarImage
              className="object-cover"
              src={process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
            />
            <AvatarFallback>JT</AvatarFallback>
          </Avatar>
          <span>{props.user}</span>
          <span>• 2d ago</span>
        </div>
        <div>{props.comment}</div>
      </div>
    </div>
  );
};

export default ModalComments;
