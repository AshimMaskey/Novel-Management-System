import { useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";

export default function ChapterPage() {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen containerBox from-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Chapter 3: School Trouble</h1>
          <p className="text-gray-400">Posted on July 26, 2025</p>
        </div>

        {/* Chapter Content */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-10 leading-relaxed space-y-4">
          <p>
            The morning had barely started, and chaos already broke loose in the
            kitchen. The tsundere mom dropped her ladle in protest of the
            childish mom trying to add candy into the curry.
          </p>
          <p>
            Takumi sighed. "Every single day feels like a light novel now," he
            muttered as he pulled on his school blazer and headed out.
          </p>
          <p>
            But today, something was different. His childhood friend stood at
            the gate — holding a letter. “Takumi… let’s talk after class.”
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
          dignissimos laborum, iure explicabo, quia placeat ex cumque facilis
          dolore illum aut voluptate velit quo aliquam, soluta ipsum magnam
          neque quidem culpa. Vero dolorem ullam dolores vel? Veniam quae atque,
          et illum necessitatibus quo odit. Nobis a dolore corporis maiores
          libero eius sed porro repellat nisi aliquam hic rerum exercitationem
          itaque dolorum fuga quasi, vero error dignissimos dolorem dolores,
          quae sequi ullam totam. Veniam necessitatibus molestias impedit ea
          exercitationem natus repudiandae nihil ratione dolorem cumque, unde
          nemo libero ducimus inventore fugit pariatur! Provident rem illo
          sapiente ex fugit tenetur qui? Aliquid! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Veniam, quo id! Reiciendis quaerat esse
          veritatis delectus minima fugiat iure ipsam aspernatur sint sunt enim,
          dignissimos tempore, distinctio quis ipsa sed, sit quod ipsum nulla
          porro laudantium! Enim dolore dolores quidem adipisci autem. Magnam
          impedit quidem soluta placeat ab nostrum cupiditate blanditiis
          adipisci et. Odit facere, et quidem dicta dolores assumenda
          exercitationem aliquid non deserunt in eligendi perspiciatis, quia
          quaerat molestias explicabo optio omnis. Fugiat laborum atque error,
          necessitatibus distinctio quam alias, mollitia dolor officia eius ex
          aliquam voluptatum libero accusantium asperiores excepturi accusamus?
          Sed, perferendis ea officiis, facilis esse, illo quaerat veniam iusto
          sapiente earum aut nostrum ratione magnam obcaecati animi reiciendis
          odit velit laborum laboriosam illum voluptatum fuga nobis repellat.
          Asperiores, velit. Officia, quibusdam. Placeat temporibus doloremque
          iusto porro incidunt illo id sunt labore, accusantium deleniti unde
          commodi tempora error quasi enim ipsum est, natus saepe vel tenetur
          corrupti. A, ratione facilis? Iusto porro ipsa, quam, consequuntur
          nobis aliquam distinctio dolorem incidunt pariatur, voluptates fugit
          tempora atque iure? Obcaecati tenetur sit odio quidem quasi
          accusantium quae debitis quo adipisci, aspernatur maxime est quisquam
          nostrum totam saepe laborum eos fugiat similique eveniet enim tempora
          ducimus odit sunt rem! Perferendis fuga et dolorem magni rerum qui.
          Iure molestias magnam nam. Ducimus at reprehenderit fugiat doloremque,
          nihil nulla ad assumenda omnis necessitatibus voluptates, ea natus,
          non porro officiis autem magni! Fugit harum, odit quidem hic cumque
          exercitationem eaque aperiam! Omnis laboriosam maiores corrupti vero
          alias placeat beatae, voluptatum cumque totam magnam, error obcaecati,
          exercitationem adipisci explicabo commodi eaque! Ratione
          necessitatibus, consequuntur animi numquam non veritatis voluptatum
          placeat quis excepturi. Quasi, possimus reiciendis! Velit rem hic
          perferendis qui libero similique in iste porro ipsa deserunt, quod,
          facilis cupiditate. Architecto inventore necessitatibus possimus alias
          modi magni vitae beatae maiores, distinctio recusandae quibusdam
          voluptatem voluptates. Vitae excepturi modi pariatur quo iure ratione
          odit quam velit facere eligendi esse ullam minus labore tempore sed
          ipsum officiis totam, dolorum perspiciatis, alias doloribus voluptates
          mollitia sint? Quas ab aut mollitia quae quasi vero cum dolorem,
          blanditiis quidem a minus facere, necessitatibus debitis laborum eum
          incidunt doloribus temporibus amet nihil molestiae laboriosam,
          pariatur aspernatur libero natus. Rem mollitia itaque pariatur
          reprehenderit, nulla repellat blanditiis architecto aspernatur velit
          adipisci amet at natus provident ipsam porro praesentium. Facere
          tenetur eaque nesciunt a similique repellendus, temporibus beatae est
          quaerat molestiae error sapiente aperiam ducimus iure harum id eos,
          officiis aut sint numquam tempora suscipit? Animi consequuntur, alias
          dolores aspernatur eligendi quisquam! Possimus consequuntur
          consectetur suscipit ab excepturi fugit voluptas alias magnam! Eius
          temporibus veritatis quaerat fugit sapiente, facilis minus,
          exercitationem corrupti voluptate quas voluptas pariatur odio veniam
          ea. Laboriosam blanditiis voluptas placeat officia atque, dolores nisi
          repellendus dolorem cumque illo ipsa qui molestiae, eius quidem
          repellat iste veniam consequatur et reprehenderit libero excepturi
          quibusdam minus? Error magnam at voluptas odit, quidem distinctio,
          quae ea adipisci veritatis eveniet delectus asperiores. Id veritatis
          accusantium pariatur atque repellat incidunt, minima rerum aperiam
          error reiciendis corporis illum iusto dolorem expedita tenetur minus
          quisquam obcaecati dicta sit sapiente? Aliquam ratione delectus iusto
          amet dolore possimus alias et, deleniti, placeat quae architecto
          cumque accusantium officia rem repellat soluta reprehenderit eaque
          facere. Debitis nesciunt esse soluta incidunt accusantium neque
          dignissimos, laboriosam, deleniti fugiat necessitatibus quam
          perferendis laborum quos maxime quibusdam voluptatibus? Laudantium aut
          nulla corporis ad commodi facere iste ipsam in vel eum, odit facilis
          recusandae fuga praesentium laboriosam eligendi. Sit tempore ipsa
          neque error facilis voluptatem beatae dolorum. Id consequuntur eius
          repellat voluptatibus mollitia blanditiis, quisquam vero odio,
          voluptatum iure laboriosam recusandae, quam nostrum officia dolorem
          quaerat tempora atque ea explicabo itaque. Nesciunt error inventore
          temporibus? Corporis sed saepe ea impedit dolore. Explicabo saepe
          incidunt sapiente repudiandae voluptatem vel consectetur, blanditiis
          rerum, eos recusandae molestiae similique aliquid dignissimos ad sit
          molestias repellendus in excepturi! Debitis ratione possimus beatae
          tenetur illo dolorum expedita architecto, id itaque dolores, voluptate
          quis dicta eum delectus suscipit quibusdam voluptatem obcaecati est a!
          Ratione, laudantium voluptate dolorum consequuntur distinctio vero
          tempore eos placeat soluta, vel unde enim itaque est nam magnam!
          Consectetur tenetur quasi laborum praesentium eum doloremque officiis
          itaque quos, unde labore, deleniti libero reprehenderit provident
          asperiores quam, eos et in voluptatem? Dolorum inventore eaque eius
          explicabo incidunt aliquam iusto laudantium est similique ipsum
          doloremque ratione ea assumenda accusamus facilis eveniet porro,
          sapiente consectetur nihil obcaecati minus nesciunt modi? Facilis,
          asperiores assumenda a, sunt delectus animi odio quibusdam molestiae
          tempore similique voluptate vero vitae perspiciatis doloribus quaerat
          libero aliquam rem eaque provident in, debitis aspernatur quas hic
          perferendis. Ipsam veniam voluptatibus asperiores vero libero
          aspernatur blanditiis sapiente, molestiae mollitia corrupti minima ut
          repellat pariatur laborum illum, iure aliquid. Ad voluptate tempora
          laudantium recusandae tempore. Sed laudantium fugiat eum, quia saepe
          repellendus repellat atque perspiciatis rerum molestiae, autem iure,
          debitis a. Odit deleniti quae dolor aspernatur voluptates. Impedit ad
          neque perferendis fuga quaerat esse, magnam in molestias corporis qui
          id rem ducimus soluta totam perspiciatis, quis minima nisi voluptas,
          sunt quod cupiditate amet possimus quasi! Distinctio officia neque,
          qui ea eligendi sunt unde eaque recusandae dignissimos, iure alias
          suscipit ut eius soluta iste accusamus deserunt cumque, nulla
          consectetur eos est praesentium assumenda eum ducimus. Sunt non,
          veritatis consequuntur vero recusandae dolor sed tenetur repellendus
          mollitia culpa laborum repellat quibusdam neque sit quasi vitae
          pariatur cumque laudantium fugit nisi magni commodi est. Sunt quo a
          voluptatum consectetur, nam nostrum nesciunt eos at ratione? Dolores
          corporis voluptatibus veniam molestiae illum deleniti velit vel iusto
          asperiores fugit reprehenderit natus, quibusdam voluptas id illo iure.
          Quia asperiores sunt voluptatum aspernatur perspiciatis expedita?
          Magni officia mollitia quibusdam eum id ratione vitae, eos corrupti,
          cupiditate tempore suscipit natus. Eaque odio sapiente odit quae. Enim
          expedita facere ipsum ipsa doloribus temporibus quidem hic magnam esse
          nulla? Voluptatum illo tempore corrupti ex voluptas, provident earum
          consequuntur non nostrum distinctio error. Sunt harum qui magni! Quod
          alias aperiam quaerat, nobis distinctio hic architecto dicta
          aspernatur soluta cumque? Eum, iste quas asperiores commodi harum fuga
          est expedita? Laborum, consequatur amet hic quos itaque similique
          sequi, repellat adipisci vitae tempora culpa aut asperiores distinctio
          maiores!
        </div>

        {/* Navigation */}
        <div className="flex justify-between mb-12">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
            <ArrowLeft className="w-4 h-4" />
            Previous Chapter
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
            Next Chapter
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Comments */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Comments
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none resize-none"
              rows={4}
              placeholder="Leave your thoughts..."
            ></textarea>
            <button
              type="submit"
              className="mt-3 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
            >
              Post Comment
            </button>
          </form>

          {/* Display Comments */}
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li
                  key={index}
                  className="flex gap-3 bg-gray-800 p-4 rounded-lg"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/7.x/thumbs/svg?seed=User"
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>

                  {/* Comment Content */}
                  <div>
                    <p className="font-semibold text-sm">User{index + 1}</p>
                    <p className="text-sm text-gray-300 mt-1">{comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
