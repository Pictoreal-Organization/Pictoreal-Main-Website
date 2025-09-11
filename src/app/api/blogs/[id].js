import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        // Increment read count
        blog.activity.reads += 1;
        await blog.save();
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}