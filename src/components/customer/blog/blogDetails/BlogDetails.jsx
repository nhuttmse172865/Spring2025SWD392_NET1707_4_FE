import React from "react";
import { useParams } from "react-router-dom";
import "./BlogDetails.css";

const blogData = [
  {
    id: 1,
    title: "Hướng dẫn các bước skincare cơ bản chi tiết tại nhà",
    content: `
<h2 style="text-align: justify;" id="skincare-l-g">Skincare là gì?</h2>
<p style="text-align: justify;">Skincare là dạng thuật ngữ tiếng Anh, hiểu theo nghĩa là "chăm sóc da mặt". Skincare là tên gọi chung cho những tác động trực tiếp của con người tới làn da để làm cho da đẹp chuyên sâu bên trong từ các dòng sản phẩm dưỡng da.</p>
<p style="text-align: justify;">Thông thường skincare được thực hiện theo các bước và theo một quy trình cụ thể và chuẩn xác giúp loại bỏ bị mụn, se khít lỗ chân lông, ngăn ngừa sắc tố da giúp da luôn săn chắc, khỏe mạnh không bị chảy xệ và cuối cùng mới là trắng sáng.</p>
<h2 style="text-align: justify;" id="v-sao-n-n-ch-m-s-c-da-h-ng-ng-y">Vì sao nên chăm sóc da hằng ngày?</h2>
<p style="text-align: justify;">Da là cơ quan quan trọng đóng vai trò như một “hàng rào” bảo vệ bên trong của cơ thể của bạn và môi trường xung quanh. Đặc biệt, làn da còn có khả năng phản ánh tình trạng sức khỏe và tuổi tác của bạn. Vì vậy, việc giữ làn da sáng hồng, khỏe mạnh mỗi ngày là vô cùng cần thiết, nhất là với những người ảnh hưởng bởi tính chất công việc thường xuyên phải tiếp xúc với khách hàng, công chúng.</p>
<p style="text-align: justify;">Theo các chuyên gia, bạn nên bắt đầu chăm sóc da từ sớm, mục đích là ngăn ngừa các tình trạng về da như xuất hiện nếp nhăn, sạm da, lão hóa,... điều này giúp cho việc điều trị sẽ dễ dàng và ít tốn kém hơn so với cố gắng khắc phục trong tương lai.</p>
<p style="text-align: justify;">Da sẽ bắt đầu có hiện tượng lão hóa ở độ tuổi 30, vậy nên khi skincare đúng thời điểm và cách sẽ giúp làn da của bạn luôn trong trạng thái tốt nhất. Khi chăm sóc da hiệu quả còn giúp ngăn ngừa các loại mụn trứng cá, giảm nếp nhăn và đồng đều màu da toàn diện.</p>
<h2 style="text-align: justify;" id="t-c-d-ng-c-a-vi-c-skincare-ch-m-s-c-da">Tác dụng của việc skincare chăm sóc da</h2>
<p style="text-align: justify;">Chu trình skincare cho da là điều rất quan trọng, theo các chuyên gia da liễu cho biết: Dù nam hay nữ, bạn cũng cần phải skincare tối thiểu 1 lần/ngày để bảo vệ làn da, duy trì sắc đẹp và bảo vệ sức khỏe của chính bản thân.&nbsp;</p>
<p style="text-align: justify;">Việc skincare đúng cách còn giúp làn da tái tạo tế bào mới, hệ tuần hoàn máu được điều hòa, kích thích sản sinh các sợi collagen giúp da khỏe mạnh. Ngoài việc skincare đúng cách, bạn cần bổ sung các dưỡng chất cần thiết cho da để đạt được hiệu quả tối ưu.</p>
<h2 style="text-align: justify;" id="c-ch-x-c-nh-t-nh-tr-ng-da-c-a-b-n">Cách xác định tình trạng da của bạn</h2>
<p style="text-align: justify;">Mỗi loại da đều có đặc điểm và cách nhận biết khác nhau. Muốn chọn đúng sản phẩm, tìm được quy trình chăm sóc da phù hợp, bạn cần "thấu hiểu" làn da của mình thuộc dạng nào và đang cần gì. Để hiểu rõ hơn về loại da của mình cũng như phương pháp chăm cho từng loại da, cùng xem những dấu hiệu nhận biết dưới đây nhé!</p>
<h3 style="text-align: justify;" id="da-d-u">Da dầu&nbsp;</h3>
<p style="text-align: justify;">Da dầu là hiện tượng trên bề mặt da xuất hiện nhiều dầu nhờn và luôn trong trạng thái ẩm ướt, bóng loáng, lỗ chân lông khá to và thường có nhiều mụn.&nbsp;</p>
<p style="text-align: justify;">Da dầu có mô nhờn dày, thiên về acid, thường gặp ở giới nam nhiều hơn nữ, đặc biệt ở lứa tuổi dậy thì.</p>
<p style="text-align: justify;">Khi bị stress hay da dày hoạt động quá mức, làn da của bạn nhanh chóng bị đổ dầu. Thời tiết nắng nóng buộc da phải điều tiết nhiều, từ đó sẽ ra dầu nhiều hơn.</p>
<h3 style="text-align: justify;" id="da-th-ng">Da thường</h3>
<p style="text-align: justify;">Đây là tuýp da lý tưởng của nhiều người, cách nhận biết loại da này đó là lỗ chân lông nhỏ, vùng chữ T có một ít dầu nhưng không quá nhờn hay quá khô. Da luôn trong trạng thái hồng hào, đều màu, mướt mịn tự nhiên.&nbsp;</p>
<p style="text-align: justify;">Ở loại da thường, lỗ chân lông sẽ rất nhỏ bạn khó có thể nhìn thấy. Làn da thường không có xu hướng bị nứt nẻ hoặc bong vảy. Các loại da thường rất hiếm thấy các nếp nhăn và tông màu da thường đồng đều, hầu như không có nhược điểm rõ rệt.</p>
<p style="text-align: justify;">Ngay cả khi bạn sở hữu loại da thường với một vài nhược điểm nhỏ, bạn có thể khắc phục bằng cách luôn giữ cho làn da sạch sẽ và tuân theo một quy trình chăm sóc da đúng cách thì sẽ có thể phục hồi nhanh cho da rạng rỡ và khỏe mạnh.</p>
<h3 style="text-align: justify;" id="da-kh">Da khô</h3>
<p style="text-align: justify;">Loại da luôn ở trạng thái thiếu nước, ít dầu, cảm giác khô căng, hơi sần sùi, hay bị rát khi rửa mặt, thường có hiện tượng tróc vảy da do thiếu ẩm.</p>
<p style="text-align: justify;">Tuyến bã nhờn kém hoạt động, vì vậy da bạn bị thiếu độ ẩm trầm trọng, dễ bị nứt nẻ, bong vảy khi ở thời tiết lạnh, viêm nhiễm và mẩn đỏ.</p>
<p style="text-align: justify;">Da khô ít bị nổi mụn và lỗ chân lông nhỏ. Tuy nhiên, nếu tình trạng da khô ráp kéo dài quá lâu dễ dẫn đến hiện tượng xuất hiện nếp nhăn, lão hóa da.</p>
<p style="text-align: justify;">Khi sở hữu một làn da khô, bạn sẽ có cảm giác căng da hoặc cũng có thể nổi nhiều các mảng vảy khô thậm chí là bong tróc. Những người có làn da khô thường có lỗ chân lông gần như rất nhỏ và có thể tình trạng xuất hiện các nếp nhăn sớm hơn cũng như sẽ bị kích ứng da thường xuyên hơn.</p>
<h3 style="text-align: justify;" id="da-h-n-h-p">Da hỗn hợp</h3>
<p style="text-align: justify;">Đây là loại da phân bố không đều nhau thường sẽ có hai hoặc nhiều loại da khác nhau trên khuôn mặt, có chỗ sẽ khô (hai bên má), chỗ khác thì nhiều dầu (trán, mũi, cằm). Người sở hữu làn da này dễ bị mụn và có lỗ chân lông to. Các loại da hỗn hợp thường trải qua trình trạng khô da và bong tróc trên một số vị trí nhất định của khuôn mặt và dầu quá mức ở những phần còn lại.</p>
<p style="text-align: justify;">Da hỗn hợp là loại da phổ biến nhất ở người châu Á, tuy nhiên rất khó xác định để điều trị. Da thường sẽ bóng loáng ở vùng chữ T, bao gồm: trán, mũi và dưới cằm. Những khu vực này là nơi tập trung nhiều tuyến dầu và hoạt động nhiều hơn các phần khác trên khuôn mặt.</p>
<h2 style="text-align: justify;" id="skincare-v-o-th-i-i-m-n-o-l-t-t-trong-ng-y">Skincare vào thời điểm nào là tốt trong ngày?</h2>
<p style="text-align: justify;">Theo nghiên cứu từ các chuyên gia da liễu, thời điểm skincare buổi sáng và buổi tối. Sáng từ 06:00-08:00 tối từ 20:00-21:00 là thời gian thích hợp để chăm sóc da tốt nhất. Trong khoảng thời gian này, hệ tuần hoàn trong cơ thể hoạt động mạnh dần, oxy trong máu tăng lên, giúp cơ thể hấp thu các chất dinh dưỡng tốt hơn.</p>
<p style="text-align: justify;">Ngoài ra, skincare buổi sáng sẽ giúp bạn có một làn da sạch sáng, mềm mịn và tươi trẻ nguyên ngày. Skincare buổi tối giúp phục hồi và tái tạo làn da sau ngày dài mệt mỏi.</p>
<p style="text-align: justify;">Do đó, đây được xem là thời điểm thích hợp để bạn có thể tiến hành thực hiện các bước skincare đạt được hiệu quả cao nhất.</p>
<h2 style="text-align: justify;" id="quy-tr-nh-skincare-chu-n-t-ng-b-c-t-c-b-n-n-n-ng-cao-cho-da-th-ng">Quy trình skincare chuẩn từng bước từ cơ bản đến nâng cao cho da thường</h2>
<p style="text-align: justify;">Skincare rất đơn giản tuy nhiên cần đúng cách và đúng thứ tự skincare mới đem lại hiệu quả cao. Nhiều bạn cứ nghĩ skincare chỉ cần làm sạch da, lau khô, dùng sữa rửa mặt là đủ. Đúng vậy, tuy nhiên đó chỉ là các bước cơ bản còn để nâng cao và chuyên sâu hơn thì bạn cần làm theo các bước skin care sau đây:&nbsp;</p>
<h3 style="text-align: justify;" id="b-c-1-t-y-trang-da">Bước 1: Tẩy trang da</h3>
<p style="text-align: justify;">Tẩy trang là một bước không thể thiếu trong quy trình skincare chăm sóc da hằng ngày. Đặc biệt là những bạn thường xuyên trang điểm. Tẩy trang sẽ giúp bạn loại bỏ nhanh chóng lớp trang điểm, bụi bẩn và lượng dầu thừa trên da. Việc rửa mặt bằng nước sẽ không đủ để làm sạch da, vì khi da sạch thì các bước dưỡng sau mới phát huy được hiệu quả. Nếu làn da bẩn sẽ dễ gây bí bách ở lỗ chân lông và sinh mụn.</p>
<h3 style="text-align: justify;" id="b-c-2-l-m-s-ch-da-m-t-b-ng-s-a-r-a-m-t">Bước 2: Làm sạch da mặt bằng sữa rửa mặt</h3>
<p style="text-align: justify;">Các sản phẩm tẩy trang không hẳn sẽ loại bỏ hoàn toàn bụi bẩn cho làn da, do đó bạn cần kết hợp sử dụng sữa rửa mặt để đảm bảo da sạch hoàn toàn.</p>
<p style="text-align: justify;">Nguyên tắc cơ bản khi chọn sữa rửa mặt đó là độ pH thấp hơn 7, các chất hoạt động bề mặt, tạo bọt đảm bảo độ an toàn, không làm da bị khô.&nbsp;</p>
<p style="text-align: justify;">Đối với da mụn, bạn nên dùng các sản phẩm có chứa các thành phần trị mụn như: alpha hydroxy acid, salicylic acid (BHA). Nếu muốn sản phẩm dịu nhẹ hơn nữa, bạn có thể chọn tea tree oil (tinh dầu trà).</p>
<p style="text-align: justify;">Đối với những bạn có làn da nhạy cảm, nên lựa chọn các dùng sản phẩm có nguồn gốc tự nhiên không có chứa Sodium Lauryl Sulfate (SLS). Một hoạt chất tẩy rửa có thể gây kích ứng da.</p>
<h3 style="text-align: justify;" id="b-c-3-t-y-t-b-o-ch-t-tr-n-da">Bước 3: Tẩy tế bào chết trên da</h3>
<p style="text-align: justify;">Những yếu tố từ ánh nắng mặt trời làm cho bề mặt da trở nên dày bất thường và dễ bị tổn thương. Tình trạng mụn trứng cá và da dầu khiến vấn đề trở nghiêm trọng hơn. Bước tẩy tế bào chết trong quy trình skincare hằng ngày giúp loại bỏ bụi bẩn tích tụ - gây bít tắc lỗ chân lông, giúp da đều màu và loại bỏ các nếp nhăn sâu.</p>
<h3 style="text-align: justify;" id="b-c-4-s-d-ng-toner-gi-p-c-n-b-ng-ph">Bước 4: Sử dụng toner giúp cân bằng độ pH</h3>
<p style="text-align: justify;">Các thành phần như: như glycerin, skin freshener, tinh chất hoa hồng, hoa cúc chamomile, hoa oải hương, trà xanh cùng với chiết xuất nha đam, thảo dược, collagen nước… để tăng cường dưỡng chất cho làn da, phục hồi da và bổ sung độ ẩm có chứa trong toner giúp cho bề mặt da được sạch và căng khỏe ngay sau khi rửa mặt.&nbsp;</p>
<p style="text-align: justify;">Đồng thời, bước toner cũng giúp giảm sưng viêm, tấy đỏ và da khô bong tróc, làm sạch da, thu nhỏ lỗ chân lông , sát khuẩn nhưng vẫn giữ cho da độ ẩm cần thiết.</p>
<h3 style="text-align: justify;" id="b-c-5-s-d-ng-s-n-ph-m-c-tr">Bước 5: Sử dụng sản phẩm đặc trị</h3>
<p style="text-align: justify;">Nếu da bạn có mụn thì nên sử dụng các sản phẩm đặc trị mụn ngay sau bước toner. Chỉ cần chấm thuốc lên các nốt mụn rồi đợi khoảng từ 20-30 phút cho hoạt chất thẩm thấu vào da. Thực hiện cách này cho đến khi da không còn nổi mụn nữa.</p>
<h3 style="text-align: justify;" id="b-c-6-thoa-serum-cung-c-p-d-ng-ch-t">Bước 6: Thoa serum cung cấp dưỡng chất</h3>
<p style="text-align: justify;">Serum là một trong những bước quan trọng trong quy trình skincare nâng cao. Bạn nên sử dụng serum vào buổi sáng và buổi tối để đạt được hiệu quả tối ưu. Trong serum chứa các hoạt chất chống oxy hóa ngăn ngừa lão hóa da, giúp bảo vệ làn da của bạn khỏi tác hại của môi trường như: bụi bẩn, thời tiết, ánh nắng mặt trời và ô nhiễm.</p>
<h3 style="text-align: justify;" id="b-c-7-d-ng-m-cho-da">Bước 7: Dưỡng ẩm cho da</h3>
<p style="text-align: justify;">Nếu da bạn đang ổn định, không có quá nhiều khuyết điểm để sử dụng các loại sản phẩm đặc trị thì chỉ cần dùng 1 loại serum giàu dưỡng chất cấp ẩm là đủ. Còn đối với những bạn da khô, hoặc nằm ở trong phòng lạnh có thể sử dụng thêm kem dưỡng ẩm ban đêm.</p>
<h3 style="text-align: justify;" id="b-c-8-thoa-kem-ch-ng-n-ng">Bước 8: Thoa kem chống nắng</h3>
<p style="text-align: justify;">Thoa kem chống nắng là bước vô cùng quan trọng trong skincare, đây là yếu tố quyết định việc dưỡng da trước đó có hiệu quả hay không. Bởi ánh nắng chính là tác nhân gây hại của làn da, bởi sự tàn phá các tế bào da khiến da bị đen sạm, nhăn nheo và dễ dàng bị các bệnh lý về da, trong đó có ung thư da. Vì vậy, bạn cần kết hợp thêm bước thoa kem chống nắng và cần che chắn kỹ lưỡng trước khi ra ngoài nhé.</p>
<h2 style="text-align: justify;" id="m-t-s-sai-l-m-ai-c-ng-g-p-ph-i-khi-skincare">Một số sai lầm ai cũng gặp phải khi skincare</h2>
<p style="text-align: justify;">Nhiều người thường cho nghĩ rằng skincare chăm sóc da dễ. Tuy nhiên, nếu như áp dụng không đúng cách cũng như sử dụng sản phẩm chăm sóc da không phù hợp với làn da của mình. Không những khiến cho làn da bị tổn thương mà còn gây nên các hiện tượng như nổi mụn, da bị thâm sạm. Sau đây là những sai lầm mà nhiều bạn trẻ thường gặp phải, vô tình làm cho da bị ảnh hưởng nghiêm trọng gây mất thời gian và không đem lại kết quả như mong muốn.</p>
    `,
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    title: "Những sai lầm khi skincare có thể làm hỏng làn da",
    content: `
      <p style="text-align: justify;">Bạn lo lắng về tình trạng lão hóa da do các nguyên nhân về tuổi tác cũng như khói bụi ô nhiễm, và đang tìm kiếm phương pháp ngăn ngừa tình trạng này diễn ra. Ở bài viết này, chúng tôi sẽ hướng dẫn các cách massage trẻ hóa làn da chống lão hóa dễ dàng thực hiện tại nhà giúp bạn duy trì khuôn mặt thon gọn và tươi trẻ.</p>
    `,
    image: "https://placehold.co/600x400",
  },
];

const BlogDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const post = blogData.find((item) => item.id === Number(id));

  if (!post) return <h2>Bài viết không tồn tại!</h2>;

  return (
    <div className="blog-container">
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogDetails;
